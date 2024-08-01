import useAccount from '@hooks/useAccount';
import RootNavigation from '../RootNavigation';
import { useEffect, useMemo } from 'react';

const RootNavigationContainer = () => {
  const { account } = useAccount();

  const isLoginNeed = useMemo(() => !account, [account]);

  useEffect(() => {
    window.document.getElementById('pending')!.style.visibility = 'hidden';
  }, []);

  return <RootNavigation isLoginNeed={isLoginNeed} />;
};

export default RootNavigationContainer;
