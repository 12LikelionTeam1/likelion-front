import React from 'react';
import styles from '../styles/mypage.module.css';
import images from '@assets/images';
import { UserInfoType } from '../containers/MypageContainer';

interface ProfileProps {
    userInfo: UserInfoType;
}

const Profile = ({ userInfo }: ProfileProps) => {
    return (
    <>
    <div className={styles.profile}>
        <img src={userInfo.profile_image_url} alt='profile' />
        <div className={styles.name}>
            <p>{userInfo.nickname} 작가님</p>
            <div className={styles.email}>
            <p>{userInfo.display_id}</p>
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
