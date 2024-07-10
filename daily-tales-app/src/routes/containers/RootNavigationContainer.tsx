import useAccount from '@hooks/useAccount';
import RootNavigation from '../RootNavigation';
import { useMemo } from 'react';

const RootNavigationContainer = () => {
  const { account } = useAccount();

  const isLoginNeed = useMemo(() => !account, [account]);

  return <RootNavigation isLoginNeed={isLoginNeed} />;
};

export default RootNavigationContainer;
