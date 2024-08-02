import styles from '../styles/mypage.module.css';
import images from '@assets/images';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to='/'>
        <img src={images.icons.backarrow} alt='이전페이지' />
      </Link>
      <p>마이페이지</p>
    </div>
  );
};

export default Header;
