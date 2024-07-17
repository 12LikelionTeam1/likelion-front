import { BrowserRouter } from 'react-router-dom';
import RootNavigationContainer from '@routes/containers/RootNavigationContainer';
import { Provider } from 'react-redux';
import store from '@store/store';
import axios from 'axios';

const TOKEN =
  'eyJyZWdEYXRlIjoxNzIwNzkxMTIzMDcxLCJjYXQiOiJBQ0NFU1MiLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmNkZWZnIiwiZXhwIjoxODA3MTkxMTIzfQ.THtUmgXyEhPgx4gu3ZKQpk18Cgb1WVAxrqgh-Y-IeiQ';

axios.defaults.baseURL = 'http://34.22.100.127/api';
axios.interceptors.request.use((config) => {
  config.headers.Authorization = TOKEN;
  return config;
});

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
