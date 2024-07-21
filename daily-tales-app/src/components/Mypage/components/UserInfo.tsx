import React from 'react';
import styles from '../styles/mypage.module.css';
import images from '@assets/images';

const UserInfo = () => {
    return (
    <div className={styles.infocontainer}>
        <div className={styles.userinfo}>
        <img src={images.icons.user} alt='usericon' />
        <p>사용자 정보</p>
    </div>
    <div className={styles.savetab}>
        <a href=''>
            <img src={images.icons.heart} alt='heart' />
            문집 보러가기
            <img src={images.icons.next} alt='next' />
        </a>
        </div>
    </div>
    );
};

export default UserInfo;
