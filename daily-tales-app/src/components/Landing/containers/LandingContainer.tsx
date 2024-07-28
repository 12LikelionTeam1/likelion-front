import { CredentialResponse, GoogleOAuthProvider } from '@react-oauth/google';
import Landing from '../Landing';
import { useCallback } from 'react';
import useAccount from '@hooks/useAccount';
import axios from 'axios';

export type TokenPayloadType = {
  aud: string;
  azp: string;
  email: string;
  email_verified: true;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
};

function parseToken(token: string): TokenPayloadType {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload) as TokenPayloadType;
}

const LandingContainer = () => {
  const { __updateAccountInfo } = useAccount();

  const onGoogleLoginSuccessed = useCallback(
    (cr: CredentialResponse) => {
      if (cr.credential) {
        axios
          .post('/oauth/google', {
            token: cr.credential,
          })
          .then(({ data, status }) => {
            if (status == 200) {
              __updateAccountInfo({
                access_token: data.access_token,
                refresh_token: data.refresh_token,
                ...parseToken(cr.credential!),
              });
            }
          });
      }
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
