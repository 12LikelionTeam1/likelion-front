import {
  CredentialResponse,
  GoogleOAuthProvider,
  useGoogleOneTapLogin,
} from '@react-oauth/google';
import Landing from '../Landing';
import { useCallback, useState } from 'react';

const LandingContainer = () => {
  const [isGoogleLoginClicked, setIsGoogleLoginClicked] = useState(false);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Landing onGoogleLoginClicked={() => setIsGoogleLoginClicked(true)} />
      {isGoogleLoginClicked && <GoogleLogin />}
    </GoogleOAuthProvider>
  );
};

const GoogleLogin = () => {
  const onGoogleLoginSuccessed = useCallback((token: CredentialResponse) => {
    console.log(token);
  }, []);

  const onGoogleLoginFailed = useCallback(() => {}, []);

  useGoogleOneTapLogin({
    onSuccess: onGoogleLoginSuccessed,
    onError: onGoogleLoginFailed,
  });

  return <></>;
};

export default LandingContainer;
