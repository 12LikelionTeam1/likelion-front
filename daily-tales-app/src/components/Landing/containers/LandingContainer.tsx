import { CredentialResponse, GoogleOAuthProvider } from '@react-oauth/google';
import Landing from '../Landing';
import { useCallback } from 'react';

const LandingContainer = () => {
  const onGoogleLoginSuccessed = useCallback((token: CredentialResponse) => {
    console.log(token);
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Landing onGoogleLoginSuccessed={onGoogleLoginSuccessed} />
    </GoogleOAuthProvider>
  );
};

export default LandingContainer;
