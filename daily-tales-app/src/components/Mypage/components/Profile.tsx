import styles from '../styles/mypage.module.css';
import images from '@assets/images';
import { UserInfoType } from '../containers/MypageContainer';
import useAccount from '@hooks/useAccount';

interface ProfileProps {
  userInfo: UserInfoType;
}

const Profile = ({ userInfo }: ProfileProps) => {
  const { account } = useAccount();

  return (
    <>
      <div className={styles.profile}>
        <img src={userInfo.profile_image_url} alt='profile' />
        <div className={styles.name}>
          <p>{userInfo.nickname} 작가님</p>
          <div className={styles.email}>
            <p>{account!.email}</p>
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
