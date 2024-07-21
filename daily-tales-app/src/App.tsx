import { BrowserRouter } from 'react-router-dom';
import RootNavigationContainer from '@routes/containers/RootNavigationContainer';
import { Provider } from 'react-redux';
import store from '@store/store';
import axios from 'axios';

const TOKEN =
  'eyJyZWdEYXRlIjoxNzIxMjIwMzIwOTQwLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImNhdCI6IkFDQ0VTUyJ9.eyJ1c2VySWQiOiJhYmNkZWZnIiwiZXhwIjoxNzIxMzA2NzIwfQ.YhdEMpNu04EoL6rjF50SwUICoazFZXoChjqEvDLBK7g';

axios.defaults.baseURL = 'http://34.22.100.127/api';
axios.interceptors.request.use((config) => {
  config.headers.Authorization = TOKEN;
  return config;
});

const App = () => {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <RootNavigationContainer />
      </BrowserRouter>
    </Provider>
    </>
  );
};

export default App;
