import React from 'react';
import styles from '../styles/mypage.module.css';
import images from '@assets/images';

const Profile = () => {
    return (
    <>
    <div className={styles.profile}>
        <img src='' alt='profile' />
        <div className={styles.name}>
            <p>홍길동 작가님</p>
                <div className={styles.email}>
                <p>abc123@gmail.com</p>
                <img src={images.googleLogo} alt='googlelogo' />
            </div>
        </div>
    </div>
    <div className={styles.profilebutton}>
        <button>로그아웃 {'>'}</button>
        <button>회원탈퇴 {'>'}</button>
        </div>
    </>
    );
};

export default Profile;
