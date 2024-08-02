import styles from '../styles/mypage.module.css';
import images from '@assets/images';
import { Link } from 'react-router-dom';

const UserInfo = () => {
  return (
    <div className={styles.infocontainer}>
      <div className={styles.userinfo}>
        <img src={images.icons.user} alt='usericon' />
        <p>사용자 정보</p>
      </div>
      <div className={styles.liketab}>
        <Link to='like'>
          <img src={images.icons.heart} alt='heart' />
          <p>문집 보러가기</p>
          <img src={images.icons.next} alt='next' />
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;
