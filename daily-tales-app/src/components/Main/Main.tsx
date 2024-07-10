import images from '@assets/images';
import styles from './styles/main.module.css';
import DatePicker from '@components/common/DatePicker/DatePicker';

const Main = () => {
  return (
    <div className='container'>
      <div
        className={`${styles.header} flex flex-row justify-between items-center`}>
        <div>
          <img src={images.logos} alt='하루한글' />
        </div>
        <div className='flex flex-row items-center'>
          <DatePicker onDatePicked={() => {}} />
          <button className={styles.mypage}>
            <img src={images.icons.user} alt='마이페이지' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
