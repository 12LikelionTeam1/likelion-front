import React from 'react';
import styles from '../styles/mypage.module.css';
import images from '@assets/images';

const Header = () => {
    return (
    <div className={styles.header}>
        <img src={images.icons.prev} alt='이전페이지' />
        <p>마이페이지</p>
    </div>
    );
};

export default Header;
