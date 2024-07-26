import BreakLine from '@components/common/BreakLine/BreakLine';
import React, { useCallback, useEffect, useState } from 'react';
import styles from '../styles/home.tab.module.css';
import NanumText from '@components/common/NanumText/NanumText';
import images from '@assets/images';
import axios from 'axios';

type LoadTaleItem = {
  id: string;
  title: string;
  writer: {
    id: string;
    nickname: string;
    profile_image_url: string;
  };
  written_at: string;
};

type LoadTaleResult = {
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
  contents: LoadTaleItem[];
};

type TaleType = {
  title: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  keywords: string[];
  content: string;
  commentary: string;
  written_at: string;
};

type CardProps = {
  tale: TaleType;
};

const TaleCard = ({ tale }: CardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <>
      <div className='relative flex flex-col p-3'>
        <div className='flex flex-row'>
          <div className={styles.profile}></div>
          <div className='ml-3 flex flex-col justify-between flex-1'>
            <a>{'홍길동 작가님'}</a>
            <a className='text-sm text-gray'>{'1시간 전'}</a>
          </div>
        </div>
        <div className='gap-12' />
        <NanumText>{tale.title}</NanumText>
        <div className='gap-12' />
        <NanumText>{tale.content}</NanumText>
        <div className='gap-12' />
        <NanumText>{tale.commentary}</NanumText>
        <div className='gap-12' />
        <button
          onClick={() => setIsLiked((prev) => !prev)}
          className={`${styles.likeBtn} flex flex-row items-center`}>
          <img src={isLiked ? images.icons.heartFill : images.icons.heart} />
          <div className='gap-4' />
          <a>{'문집에 추가'}</a>
        </button>
      </div>
      <BreakLine />
    </>
  );
};

async function getDetail(id: string) {
  return (await axios
    .get(`/writings/${id}`)
    .then((res) => res.data)) as TaleType;
}

const HomeTab = () => {
  const [page, setPage] = useState(0);
  const [maximum, setMaximum] = useState(1);
  const [tales, setTales] = useState<TaleType[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTale = useCallback(async () => {
    setLoading(true);
    const { contents, total_pages } = (await axios
      .get('/writings')
      .then((res) => res.data)) as LoadTaleResult;

    setMaximum(total_pages);

    const tales = await Promise.all(contents.map(({ id }) => getDetail(id)));

    setTales(tales);

    setPage(1);
    setLoading(false);
  }, []);

  const onScrollEnd = useCallback(async () => {
    setLoading(true);

    if (page == maximum) return;

    const { contents } = (await axios
      .get('/writings' + `?page=${page}`)
      .then((res) => res.data)) as LoadTaleResult;

    const tales = await Promise.all(contents.map(({ id }) => getDetail(id)));

    setTales((prev) => [...prev, ...tales]);

    setPage((prev) => prev + 1);

    setLoading(false);
  }, [page, maximum]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (
        scrollHeight - scrollTop === clientHeight &&
        !loading &&
        page != maximum
      ) {
        onScrollEnd();
      }
    },
    [loading, page, maximum, onScrollEnd],
  );

  useEffect(() => {
    loadTale();
  }, [loadTale]);

  return (
    <div onScroll={handleScroll} className='flex flex-1 flex-col'>
      <BreakLine />
      {tales.map((v, i) => (
        <TaleCard tale={v} key={i} />
      ))}
    </div>
  );
};
export default React.memo(HomeTab);
