import { Routes, Route } from 'react-router-dom';
import NotFound from '@components/NotFound';
import LandingContainer from '@components/Landing/containers/LandingContainer';
import MainContainer from '@components/Main/containers/MainContainer';

type Props = {
  isLoginNeed: boolean;
};

const RootNavigation = ({ isLoginNeed }: Props) => {
  return (
    <Routes>
      <Route
        index
        path='/'
        element={isLoginNeed ? <LandingContainer /> : <MainContainer />}
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default RootNavigation;
