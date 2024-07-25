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
  (error) => {
    if (error.response && error.response.status == 401) {
      AccountStorage.flushAccountInfo();
      window.location.reload();
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
