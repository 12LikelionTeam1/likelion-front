import { BrowserRouter } from 'react-router-dom';
import RootNavigationContainer from '@routes/containers/RootNavigationContainer';
import { Provider } from 'react-redux';
import store from '@store/store';
import axios from 'axios';
import { AccountStorage } from '@hooks/useAccount';

axios.defaults.baseURL = 'http://34.22.100.127/api';

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
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

    return error;
  },
);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RootNavigationContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
