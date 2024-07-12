import { WritingStage } from '@components/Main/components/WritingTab';
import { useCallback } from 'react';

export type TaleType = {
  state: WritingStage;
  tale?: {
    title: string;
    content: string;
  };
  report?: string;
};

const TaleStorage = {
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
} as const;

const TMP_DATA: TaleType[] = [
  {
    state: 'report-created',
    tale: {
      title: '고독한 예술가의 오후',
      content: `한적한 오후, 도시의 소음에서 벗어난 작은 아틀리에에서 한 남자가 붓을 들고 캔버스를 응시하고 있었다. 그의 이름은 요한이었다. 요한은 삶의 의미를 찾기 위해 예술에 몸을 바친 사람이다. 그러나 요한은 종종 그의 작품 속에서도 만족을 찾지 못했다. 그는 매일 새로운 그림을 그리지만, 완성된 작품을 바라볼 때마다 마음 한 구석에 공허함이 자리 잡았다.
요한은 쇼펜하우어의 철학을 통해 이 공허함을 이해하려고 노력했다. 쇼펜하우어는 인간의 삶을 끝없는 고통의 연속으로 보았고, 그 원인이 끝없는 욕망에 있다고 했다. 요한은 이 철학적 고찰을 자신의 삶에 대입해 보았다. 그는 캔버스에 붓을 대며, 자신이 왜 이렇게 만족을 못 느끼는지 생각했다.
어느 날 오후, 요한은 작업을 잠시 멈추고 밖으로 나갔다. 그는 근처의 작은 공원을 산책하며, 주변의 자연을 관찰했다. 바람에 흔들리는 나뭇잎, 저 멀리서 들려오는 새들의 지저귐, 그리고 햇살이 비추는 호수의 반짝임. 그는 순간적으로 자신의 모든 욕망과 걱정을 잊고, 그 순간에 몰입했다. 쇼펜하우어가 말한 '예술을 통한 의지의 해방'이 바로 이런 것이었을까?
요한은 벤치에 앉아 호수를 바라보며 깊은 생각에 잠겼다. 쇼펜하우어는 예술이 의지로부터의 해방을 가져다줄 수 있다고 했다. 요한은 그동안 예술을 통해 자신의 욕망을 표현하고 해소하려 했지만, 오히려 더 큰 공허함을 느꼈던 것 같았다. 그가 진정으로 필요한 것은 예술 자체에 몰입하는 것이 아니라, 예술을 통해 순간의 평온을 찾는 것이었다.
그날 이후, 요한은 작품을 대하는 태도를 바꾸었다. 그는 더 이상 완벽한 작품을 만들기 위해 애쓰지 않았다. 대신, 매 순간 예술을 통해 느낄 수 있는 작은 기쁨과 평온을 즐기기로 했다. 캔버스에 붓을 댈 때마다 그는 자신의 의지와 욕망을 내려놓고, 그 순간에 온전히 집중했다. 그러자 신기하게도 그의 작품들은 더욱 생동감 있고 깊이가 느껴지기 시작했다.
요한은 쇼펜하우어의 철학을 통해 삶의 고통을 이해하고, 그것을 극복하는 방법을 찾았다. 그는 더 이상 완벽을 추구하지 않고, 매 순간을 있는 그대로 받아들이기로 했다. 그리고 그 순간마다 작은 기쁨을 느끼며, 자신의 삶을 조금씩 변화시켜 나갔다. 이제 요한은 캔버스 앞에서 느끼는 공허함 대신, 깊은 만족과 평온을 느낄 수 있었다.`,
    },
    report: `쇼펜하우어의 철학
내용 입력 내용 입력 내용 입력 내용 입력 내용 입력`,
  },
  {
    state: 'tale-created',
    tale: {
      title: '고독한 예술가의 오후',
      content: `한적한 오후, 도시의 소음에서 벗어난 작은 아틀리에에서 한 남자가 붓을 들고 캔버스를 응시하고 있었다. 그의 이름은 요한이었다. 요한은 삶의 의미를 찾기 위해 예술에 몸을 바친 사람이다. 그러나 요한은 종종 그의 작품 속에서도 만족을 찾지 못했다. 그는 매일 새로운 그림을 그리지만, 완성된 작품을 바라볼 때마다 마음 한 구석에 공허함이 자리 잡았다.
요한은 쇼펜하우어의 철학을 통해 이 공허함을 이해하려고 노력했다. 쇼펜하우어는 인간의 삶을 끝없는 고통의 연속으로 보았고, 그 원인이 끝없는 욕망에 있다고 했다. 요한은 이 철학적 고찰을 자신의 삶에 대입해 보았다. 그는 캔버스에 붓을 대며, 자신이 왜 이렇게 만족을 못 느끼는지 생각했다.
어느 날 오후, 요한은 작업을 잠시 멈추고 밖으로 나갔다. 그는 근처의 작은 공원을 산책하며, 주변의 자연을 관찰했다. 바람에 흔들리는 나뭇잎, 저 멀리서 들려오는 새들의 지저귐, 그리고 햇살이 비추는 호수의 반짝임. 그는 순간적으로 자신의 모든 욕망과 걱정을 잊고, 그 순간에 몰입했다. 쇼펜하우어가 말한 '예술을 통한 의지의 해방'이 바로 이런 것이었을까?
요한은 벤치에 앉아 호수를 바라보며 깊은 생각에 잠겼다. 쇼펜하우어는 예술이 의지로부터의 해방을 가져다줄 수 있다고 했다. 요한은 그동안 예술을 통해 자신의 욕망을 표현하고 해소하려 했지만, 오히려 더 큰 공허함을 느꼈던 것 같았다. 그가 진정으로 필요한 것은 예술 자체에 몰입하는 것이 아니라, 예술을 통해 순간의 평온을 찾는 것이었다.
그날 이후, 요한은 작품을 대하는 태도를 바꾸었다. 그는 더 이상 완벽한 작품을 만들기 위해 애쓰지 않았다. 대신, 매 순간 예술을 통해 느낄 수 있는 작은 기쁨과 평온을 즐기기로 했다. 캔버스에 붓을 댈 때마다 그는 자신의 의지와 욕망을 내려놓고, 그 순간에 온전히 집중했다. 그러자 신기하게도 그의 작품들은 더욱 생동감 있고 깊이가 느껴지기 시작했다.
요한은 쇼펜하우어의 철학을 통해 삶의 고통을 이해하고, 그것을 극복하는 방법을 찾았다. 그는 더 이상 완벽을 추구하지 않고, 매 순간을 있는 그대로 받아들이기로 했다. 그리고 그 순간마다 작은 기쁨을 느끼며, 자신의 삶을 조금씩 변화시켜 나갔다. 이제 요한은 캔버스 앞에서 느끼는 공허함 대신, 깊은 만족과 평온을 느낄 수 있었다.`,
    },
  },
  {
    state: 'create-tale',
  },
];

export default function useTales() {
  const __loadTale = useCallback(async (date: Date, index: number) => {
    console.log(date);
    return TMP_DATA[index - 1];
  }, []);

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
    const res: TaleType[] = [];

    for (let i = 1, prev = TaleStorage.loadTale(date, i); prev; i++)
      res.push(prev);

    if (res.length == 0 || res[res.length - 1].state != 'create-tale')
      res.push({ state: 'create-tale' });

    return TMP_DATA;
  }, []);

  return {
    __loadTale,
    __saveTale,
    __loadTales,
  };
}
