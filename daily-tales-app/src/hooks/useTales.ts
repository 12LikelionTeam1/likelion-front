import { WritingStage } from '@components/Main/components/WritingTab';
import axios from 'axios';
import { useCallback } from 'react';

export type TaleType = {
  state: WritingStage;
  tale?: {
    id?: string;
    title: string;
    content: string;
    visibility?: 'PUBLIC' | 'PRIVATE';
    writtenAt?: Date;
    commentary?: string;
    keywords?: string[];
  };
  report?: string;
};

export type WritingType = {
  id: string;
  writer_nickname: string;
  writer_profile_image_url: string;
  title: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  keywords: string[];
  content: string;
  commentary: string;
  written_at: string;
};

export const TaleStorage = {
  STORAGE_KEY: '@@TALE',
  dateInfoToKey: (date: Date, index: number): string =>
    `${TaleStorage.STORAGE_KEY}/${date.getFullYear()}${
      date.getMonth() + 1
    }${date.getDate()}/${index}`,
  loadTale: (date: Date, index: number): TaleType | undefined => {
    const prev = window.localStorage.getItem(
      TaleStorage.dateInfoToKey(date, index),
    );

    if (prev) {
      return JSON.parse(prev) as TaleType;
    }
  },
  setTale: (date: Date, index: number, tale: TaleType) =>
    window.localStorage.setItem(
      TaleStorage.dateInfoToKey(date, index),
      JSON.stringify(tale),
    ),
  getTale: (k: string) => {
    const prev = window.localStorage.getItem(k);

    if (prev) {
      return JSON.parse(prev) as TaleType;
    }
  },
  countTale: (date: Date, type: 'year' | 'month' | 'date') => {
    const keys = [];

    for (let i = 0; i < localStorage.length; i++)
      if (
        localStorage.key(i) != null &&
        localStorage.key(i)!.startsWith(TaleStorage.STORAGE_KEY)
      )
        keys.push(localStorage.key(i)!);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    switch (type) {
      case 'year':
        return keys.filter((k) =>
          k.startsWith(`${TaleStorage.STORAGE_KEY}/${year}`),
        );
      case 'month':
        return keys.filter((k) =>
          k.startsWith(`${TaleStorage.STORAGE_KEY}/${year}${month}`),
        );
      case 'date':
        return keys.filter((k) =>
          k.startsWith(
            `${TaleStorage.STORAGE_KEY}/${year}${month}${date.getDate()}`,
          ),
        );
    }
  },
} as const;

const PATHS = {
  writings: '/me/writings',
  updateReport: (id: string) => `/me/writings/${id}/commentary`,
  updateShare: (id: string) => `/me/writings/${id}/visibility`,
};

export type TaleListRow = {
  id: string;
  title: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  writtenAt: string;
};

function dateToString(date: Date): string {
  const month = date.getMonth() + 1;
  return `${date.getFullYear()}-${(month < 10 ? '0' : '') + month}-${
    (date.getDate() < 10 ? '0' : '') + date.getDate()
  }`;
}

function stringToDate(string: string): Date {
  const [y, m, d] = string.split('-').map(parseInt);

  const res = new Date();

  res.setFullYear(y);
  res.setMonth(m - 1);
  res.setDate(d);

  return res;
}

export async function readTale(id: string): Promise<WritingType> {
  return axios.get(`writings/${id}`).then((d) => d.data as WritingType);
}

export async function readTaleList([from, to]: [Date?, Date?]): Promise<
  TaleType[]
> {
  const taleList = await axios
    .get(
      PATHS.writings +
        `?${from ? 'start-date=' + dateToString(from) : ''}${
          from && to ? '&' : ''
        }${to ? 'end-date=' + dateToString(to) : ''}`,
    )
    .then((res) => res.data.writings as TaleListRow[])
    .catch(() => [] as TaleListRow[]);

  const tales = await Promise.all(taleList.map((t) => readTale(t.id)));

  return tales.map(
    (t, i) =>
      ({
        state: 'report-created',
        tale: {
          id: taleList[i].id,
          title: t.title,
          content: t.content,
          visibility: t.visibility,
          writtenAt: stringToDate(t.written_at),
          commentary: t.commentary,
        },
        report: t.commentary,
      } satisfies TaleType),
  );
}

export async function insertTale(tale: TaleType) {
  return axios.post(PATHS.writings, {
    title: tale.tale!.title,
    content: tale.tale!.content,
    commentary: tale.report!,
    keywords: tale.tale!.keywords,
  });
}

export async function updateReport(id: string, report: string) {
  return axios.patch(PATHS.updateReport(id), {
    commentary: report,
  });
}

export async function updateShare(id: string, isShared: boolean) {
  return axios.patch(PATHS.updateShare(id), {
    visibility: isShared ? 'PUBLIC' : 'PRIVATE',
  });
}

export default function useTales() {
  const __saveTale = useCallback(
    async (date: Date, index: number, tale: TaleType) => {
      if (tale.state == 'tale-created') {
        TaleStorage.setTale(date, index, tale);
      } else if (tale.state == 'report-created') {
        TaleStorage.setTale(date, index, tale);
      }
    },
    [],
  );

  const __loadTales = useCallback(async (date: Date) => {
    const remote = await readTaleList([date, date]);

    const local: TaleType[] = [];

    local.push(
      ...TaleStorage.countTale(date, 'date').map(
        (k) => TaleStorage.getTale(k)!,
      ),
    );

    if (local.length == 0 || local[local.length - 1].state != 'create-tale')
      local.push({ state: 'create-tale' });

    const res = local.map(
      (l) => remote.find((r) => r.tale!.title == l.tale?.title) ?? l,
    );

    res.forEach((v, i) => TaleStorage.setTale(date, i + 1, v));

    console.log(res);

    return res;
  }, []);

  const __loadTale = useCallback(async (date: Date, index: number) => {
    return TaleStorage.loadTale(date, index);
  }, []);

  return {
    __loadTale,
    __saveTale,
    __loadTales,
  };
}
