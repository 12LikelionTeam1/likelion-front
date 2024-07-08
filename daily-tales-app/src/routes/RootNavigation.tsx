import { Routes, Route } from 'react-router-dom';
import NotFound from '@components/NotFound';
import LandingContainer from '@components/Landing/containers/LandingContainer';

const RootNavigation = () => {
  return (
    <Routes>
      <Route index path='/' element={<LandingContainer />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default RootNavigation;
