import { configureStore, createSelector } from '@reduxjs/toolkit';
import account from './account/slice';

const store = configureStore({
  reducer: {
    account,
  },
});

export const selector = createSelector(
  (state: RootStoreStateType) => state,
  (state: RootStoreStateType) => state,
);

export type RootStoreStateType = ReturnType<typeof store.getState>;

export type AppDispatchType = ReturnType<typeof store.dispatch>;

export default store;
