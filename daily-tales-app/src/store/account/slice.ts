import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AccountStateType = {
  name: string;
};

const INIT = null as AccountStateType | null;

const account = createSlice({
  name: 'account',
  initialState: INIT,
  reducers: {
    updateAccountInfo: (_, action: PayloadAction<AccountStateType>) => {
      return action.payload;
    },
    flushInfo: () => {
      return null;
    },
  },
});

export const { updateAccountInfo, flushInfo } = account.actions;
export default account.reducer;
