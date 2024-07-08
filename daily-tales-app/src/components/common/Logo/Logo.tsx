import images from '@assets/images';
import styles from './logo.module.css';

const Logo = () => {
  return (
    <div className={`${styles.root}`}>
      <div className={`${styles.verticalLineR} border-red`} />
      <div className={`${styles.verticalLineL} border-red`} />
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.horizontalLine} border-red`} />
        <img
          src={images.logo96}
          alt='하루한글 로고'
          className={`${styles.logoImage}`}
        />
        <div className={`${styles.horizontalLine} border-red`} />
      </div>
    </div>
  );
};

export default Logo;
