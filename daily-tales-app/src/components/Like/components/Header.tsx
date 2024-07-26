import React from 'react';
import styles from '../styles/header.module.css';
import images from '@assets/images';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
    <div className={styles.header}>
        <button onClick={() => navigate(-1)}>
            <img src={images.icons.backarrow} alt='이전페이지' />
        </button>
        <p>나의 문집</p>
    </div>
    );
};

export default Header;
