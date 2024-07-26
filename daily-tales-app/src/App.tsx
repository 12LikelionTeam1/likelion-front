import { BrowserRouter } from 'react-router-dom';
import RootNavigationContainer from '@routes/containers/RootNavigationContainer';
import { Provider } from 'react-redux';
import store from '@store/store';
import axios from 'axios';

axios.defaults.baseURL = 'http://34.22.100.127/api';

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
