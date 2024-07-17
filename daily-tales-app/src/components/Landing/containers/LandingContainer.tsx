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

const TOKEN =
  'eyJyZWdEYXRlIjoxNzIwNzkxMTIzMDcxLCJjYXQiOiJBQ0NFU1MiLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmNkZWZnIiwiZXhwIjoxODA3MTkxMTIzfQ.THtUmgXyEhPgx4gu3ZKQpk18Cgb1WVAxrqgh-Y-IeiQ';

const LandingContainer = () => {
  const { __updateAccountInfo } = useAccount();

  const onGoogleLoginSuccessed = useCallback(
    (cr: CredentialResponse) => {
      console.log(cr);
      if (cr.credential) {
        console.log(parseToken(cr.credential));

        __updateAccountInfo({
          access_token: TOKEN,
          refresh_token: TOKEN,
          ...parseToken(cr.credential!),
        });

        // axios
        //   .post('/oauth/google', {
        //     access_token: cr.credential,
        //   })
        //   .then(({ data, status }) => {
        //     if (status == 200) {

        //     }
        //   });
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
