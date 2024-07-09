import Logo from '@components/common/Logo/Logo';
import NanumText from '@components/common/NanumText/NanumText';
import style from './styles/landing.module.css';
import images from '@assets/images';

type Props = {
  onGoogleLoginClicked: () => void;
};

const Landing = ({ onGoogleLoginClicked }: Props) => {
  return (
    <div>
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
      <button onClick={onGoogleLoginClicked} className={style.googleBtn}>
        <img src={images.googleLogo} alt='google login logo' />
        {'Google 계정으로 시작하기'}
      </button>
    </div>
  );
};

export default Landing;
