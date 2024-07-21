import { Routes, Route } from 'react-router-dom';
import NotFound from '@components/NotFound';
import LandingContainer from '@components/Landing/containers/LandingContainer';
import MainContainer from '@components/Main/containers/MainContainer';
import MypageContainer from '@components/Mypage/containers/MypageContainer';
import Mypage from '@components/Mypage/Mypage';
import { ModalProvider } from '@components/Mypage/contexts/ModalContext';


type Props = {
  isLoginNeed: boolean;
};

const RootNavigation = ({ isLoginNeed }: Props) => {
  return (
    <ModalProvider>
      <Routes>
        <Route
          index
          path='/'
          element={isLoginNeed ? <LandingContainer /> : <MainContainer />}
        />
        <Route path='mypage' element={<MypageContainer />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </ModalProvider>
  );
};

export default RootNavigation;
