// src/components/Profile.tsx

import React, { useEffect, useState } from 'react';
import styles from '../styles/mypage.module.css';
import images from '@assets/images';
import { getUserInfo } from '../../../api/userApi';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    display_id: '',
    nickname: '',
    profile_image_url: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('access_token'); // localStorage에서 토큰을 가져옴
        if (!token) {
          throw new Error('No access token found');
        }

        const data = await getUserInfo(token);
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError('Failed to load user information');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className={styles.profile}>
        <img src={userInfo.profile_image_url} alt='profile' />
        <div className={styles.name}>
          <p>{userInfo.nickname}</p>
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
