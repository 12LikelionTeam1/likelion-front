import Logo from '@components/common/Logo/Logo';
import NanumText from '@components/common/NanumText/NanumText';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import style from './styles/landing.module.css';

type Props = {
  onGoogleLoginSuccessed: (cr: CredentialResponse) => void;
};

const Landing = ({ onGoogleLoginSuccessed }: Props) => {
  return (
    <div className={style.container}>
      <div className='container'>
        <Logo />
        <div style={{ height: 32 }} />
        <NanumText>
          {'짧은 글로 시작하는 '} <NanumText color='red'>{'깊은 '}</NanumText>{' '}
          {'사고'}
        </NanumText>
        <NanumText>
          {'하루한글과 함께 '} <NanumText color='red'>{'매일 '}</NanumText>{' '}
          {'성장하세요'}
        </NanumText>
      </div>
      <GoogleLogin
        width={368}
        theme='filled_black'
        onSuccess={onGoogleLoginSuccessed}
        useOneTap
      />
    </div>
  );
};

export default Landing;
