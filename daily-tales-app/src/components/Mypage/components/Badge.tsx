import styles from '../styles/mypage.module.css';
import images from '@assets/images';
import NanumText from '@components/common/NanumText/NanumText';

const Badge = () => {
  return (
    <div className={styles.badgescontainer}>
      <div className={styles.badgeheader}>
        <img src={images.icons.badge} alt='badge' />
        <p>획득한 배지</p>
      </div>
      <div className={styles.emptyContent}>
        <NanumText>{'다양한 배지를 획득해보세요!'}</NanumText>
      </div>
    </div>
  );
};

export default Badge;
