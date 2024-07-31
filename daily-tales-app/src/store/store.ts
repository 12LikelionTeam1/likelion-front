import { configureStore, createSelector } from '@reduxjs/toolkit';
import account from './account/slice';
import liked from './liked/slice';

const store = configureStore({
  reducer: {
    account,
    liked,
  },
});

export const selector = createSelector(
  (state: RootStoreStateType) => state,
  (state: RootStoreStateType) => state,
);

export type RootStoreStateType = ReturnType<typeof store.getState>;

export type AppDispatchType = ReturnType<typeof store.dispatch>;

export default store;
