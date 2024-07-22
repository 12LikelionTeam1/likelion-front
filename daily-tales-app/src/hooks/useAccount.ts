import {
  AccountStateType,
  flushInfo,
  updateAccountInfo,
} from '@store/account/slice';
import { RootStoreStateType } from '@store/store';
import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AccountStorage = {
  STORAGE_KEY: '@@ACCOUNT',
  loadAccountInfo: (): AccountStateType | undefined => {
    const saved = window.localStorage.getItem(AccountStorage.STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved) as AccountStateType;
    }
  },
  saveAccountInfo: (info: AccountStateType) =>
    window.localStorage.setItem(
      AccountStorage.STORAGE_KEY,
      JSON.stringify(info),
    ),
  flushAccountInfo: () =>
    window.localStorage.removeItem(AccountStorage.STORAGE_KEY),
} as const;

export default function useAccount() {
  const account = useSelector((root: RootStoreStateType) => root.account);

  const dispatch = useDispatch();

  const __updateAccountInfo = useCallback(
    (info: AccountStateType) => {
      axios.interceptors.request.use((config) => {
        config.headers.Authorization = info.access_token;
        return config;
      });
      dispatch(updateAccountInfo(info));
      AccountStorage.saveAccountInfo(info);
    },
    [dispatch],
  );

  const __flushInfo = useCallback(() => {
    dispatch(flushInfo());
    AccountStorage.flushAccountInfo();
  }, [dispatch]);

  useEffect(() => {
    if (!account) {
      const saved = AccountStorage.loadAccountInfo();

      if (saved) __updateAccountInfo(saved);
    }
  }, [account, __updateAccountInfo]);

  return {
    account,
    __updateAccountInfo,
    __flushInfo,
  };
}
