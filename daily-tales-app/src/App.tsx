import { BrowserRouter } from 'react-router-dom';
import RootNavigationContainer from '@routes/containers/RootNavigationContainer';

const App = () => {
  return (
    <BrowserRouter>
      <RootNavigationContainer />
    </BrowserRouter>
  );
};

export default App;
