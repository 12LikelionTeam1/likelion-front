import { CredentialResponse, GoogleOAuthProvider } from '@react-oauth/google';
import Landing from '../Landing';
import { useCallback } from 'react';
import useAccount from '@hooks/useAccount';

const LandingContainer = () => {
  const { __updateAccountInfo } = useAccount();

  const onGoogleLoginSuccessed = useCallback(
    (cr: CredentialResponse) => {
      console.log(cr);
      __updateAccountInfo({ name: 'Kanei' });
    },
    [__updateAccountInfo],
  );

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Landing onGoogleLoginSuccessed={onGoogleLoginSuccessed} />
    </GoogleOAuthProvider>
  );
};

export default LandingContainer;
