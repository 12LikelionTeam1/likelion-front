import axios from 'axios';

type TaleCountQuery =
  | {
      type: 'all';
      year: undefined;
      month: undefined;
    }
  | {
      type: 'month';
      year: number;
      month: undefined;
    }
  | {
      type: 'date';
      year: number;
      month: number;
    };

const PATHS = {
  all: '/me/writings/statistics/published-writings',
  month: '/me/writings/statistics/total-writings-per-month',
  date: '/me/writings/statistics/total-writings-per-day',
};

export type TaleAllQueryResponse = {
  published_writings: number;
};

export type TaleMonthQueryResponse = {
  total_writings_of_year: number;
  total_writings_per_month: {
    JANUARY: number;
    FEBRUARY: number;
    MARCH: number;
    APRIL: number;
    MAY: number;
    JUNE: number;
    JULY: number;
    AUGUST: number;
    SEPTEMBER: number;
    OCTOBER: number;
    NOVEMBER: number;
    DECEMBER: number;
  };
};

export type TaleDateQueryResponse = {
  total_writings_per_day: number[];
};

export default async function taleCount({
  type,
  year,
  month,
}: TaleCountQuery): Promise<
  TaleAllQueryResponse | TaleMonthQueryResponse | TaleDateQueryResponse
> {
  switch (type) {
    case 'all':
      return axios
        .get(PATHS.all)
        .then((d) => d.data) as Promise<TaleAllQueryResponse>;
    case 'month':
      return axios
        .get(`${PATHS.month}?year=${year}`)
        .then((d) => d.data) as Promise<TaleMonthQueryResponse>;
    case 'date':
      return axios
        .get(`${PATHS.date}?year=${year}&month=${month}`)
        .then((d) => d.data) as Promise<TaleDateQueryResponse>;
  }
}
