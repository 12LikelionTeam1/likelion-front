import React from 'react';
import styles from '../styles/mypage.module.css';
import images from '@assets/images';

const Badge = () => {
    return (
    <div className={styles.badgescontainer}>
        <div className={styles.badgeheader}>
            <img src={images.icons.badge} alt='badge' />
            <p>획득한 배지</p>
        </div>
    </div>
    );
};

export default Badge;
