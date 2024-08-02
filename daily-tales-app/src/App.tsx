import { BrowserRouter } from 'react-router-dom';
import RootNavigationContainer from '@routes/containers/RootNavigationContainer';
import { Provider } from 'react-redux';
import store from '@store/store';
import axios from 'axios';
import { AccountStorage } from '@hooks/useAccount';
import Pending from '@components/common/Pending/Pending';

axios.defaults.baseURL = 'https://dailytales.kro.kr/api';

axios.interceptors.request.use((req) => {
  window.document.getElementById('pending')!.style.visibility = 'visible';
  return req;
});

axios.interceptors.response.use(
  (res) => {
    window.document.getElementById('pending')!.style.visibility = 'hidden';
    return res;
  },
  async (error) => {
    window.document.getElementById('pending')!.style.visibility = 'hidden';

    if (
      error.response &&
      error.response.status == 401 &&
      !error.config.url.endsWith('refresh')
    ) {
      if (error.response) {
        const account = AccountStorage.loadAccountInfo();

        if (account) {
          try {
            const access_token = (await axios
              .post('/auth/refresh', {
                refresh_token: account.refresh_token,
              })
              .then((res) => res.data.access_token)) as string;

            AccountStorage.saveAccountInfo({ ...account, access_token });

            axios.interceptors.request.use((res) => {
              res.headers.Authorization = access_token;
              return res;
            });

            axios(error.config);
          } catch (_) {
            AccountStorage.flushAccountInfo();
            window.location.reload();
          }
        }
      } else {
        AccountStorage.flushAccountInfo();
        window.location.reload();
      }
    }

    if (error.response && error.response.status == 400) {
      window.location.reload();
    }

    return error;
  },
);

const App = () => {
  return (
    <Provider store={store}>
      <Pending />
      <BrowserRouter>
        <RootNavigationContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;