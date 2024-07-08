import { GoogleOAuthProvider } from '@react-oauth/google';
import Landing from '../Landing';

const LandingContainer = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Landing />
    </GoogleOAuthProvider>
  );
};

export default LandingContainer;
