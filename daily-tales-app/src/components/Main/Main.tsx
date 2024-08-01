import images from '@assets/images';
import styles from './styles/main.module.css';
import DatePicker from '@components/common/DatePicker/DatePicker';
import { useState } from 'react';
import WritingTab from './components/WritingTab';
import HomeTab from './components/HomeTab';
import { Link } from 'react-router-dom';

type Tabs = 'home' | 'write';

const Main = () => {
  const [tab, setTab] = useState<Tabs>('home');
  const [current, setCurrent] = useState(new Date());

  return (
    <div className='root overflow-scroll scroll-y'>
      <div
        className={`${styles.header} flex flex-row justify-between items-center`}>
        <div>
          <img src={images.logos} alt='하루한글' />
        </div>
        <div className='flex flex-row items-center'>
          <DatePicker onDatePicked={setCurrent} />
          <Link to = 'mypage' className={styles.mypage}>
            <img src={images.icons.user} alt='마이페이지' />
          </Link>
        </div>
      </div>
      {tab == 'write' && <WritingTab current={current} />}
      {tab == 'home' && <HomeTab />}
      <div className={`${styles.bottomTab} flex flex-row`}>
        <button
          onClick={() => setTab('home')}
          className='flex flex-col items-center flex-1'>
          <img
            src={tab == 'home' ? images.icons.homeFill : images.icons.home}
          />
          {tab == 'home' ? (
            <a className='text-xs text-black'>{'홈'}</a>
          ) : (
            <a className='text-xs text-gray'>{'홈'}</a>
          )}
        </button>
        <button
          onClick={() => setTab('write')}
          className='flex flex-col items-center flex-1'>
          <img
            src={tab == 'write' ? images.icons.writeFill : images.icons.write}
          />
          {tab == 'write' ? (
            <a className='text-xs text-black'>{'글쓰기'}</a>
          ) : (
            <a className='text-xs text-gray'>{'글쓰기'}</a>
          )}
        </button>
      </div>
    </div>
  );
};

export default Main;
