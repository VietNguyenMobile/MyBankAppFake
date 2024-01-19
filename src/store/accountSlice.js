import {createSlice} from '@reduxjs/toolkit';

export interface AccountState {
  accountBalance: number;
  accountName: string;
  accountNumber: string;
}

const initialState: AccountState = {
  accountBalance: 24999823322,
  accountName: 'Nguyen Quoc Viet',
  accountNumber: '8522702123',
};

const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  reducers: {
    addBalance: (state, action: PayloadAction<number>) => {
      state.accountBalance += action.payload;
    },
    subBalance: (state, action) => {
      state.accountBalance -= action.payload;
    },
  },
});

export const {addBalance, subBalance} = accountSlice.actions;
export default accountSlice.reducer;
