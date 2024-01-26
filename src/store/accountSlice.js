import {createSlice} from '@reduxjs/toolkit';
import {DATA_MOCK_TRANSACTION} from '../utils/constants';

export interface AccountState {
  accountBalance: number;
  accountName: string;
  accountNumber: string;
}

const initialState: AccountState = {
  accountBalance: 24999823322,
  accountName: 'Nguyen Quoc Viet',
  accountNumber: '8522702123',
  transactionData: [],
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
    addTransaction: (state, action) => {
      console.log('action.payload: ', action.payload);
      const {transactionData, forceRefreshUpdate} = action.payload;

      if (forceRefreshUpdate) {
        state.transactionData = [...transactionData];
      } else {
        state.transactionData = [...state.transactionData, ...transactionData];
      }
    },
  },
});

export const {addBalance, subBalance, addTransaction} = accountSlice.actions;
export default accountSlice.reducer;
