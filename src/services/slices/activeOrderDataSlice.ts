import { createSlice } from '@reduxjs/toolkit';
import { IOrderData } from '../../utils/types';

export const initialState: IOrderData = {
  ingredients: [],
  _id: '',
  status: '',
  number: 0,
  createdAt: '',
  updatedAt: '',
  name: '',
};

const activeOrderDataSlice = createSlice({
  name: 'activeOrderData',
  initialState: { activeOrderData: initialState },
  reducers: {
    setActiveOrderData: (state, action) => {
      state.activeOrderData = action.payload;
    },
    clearActiveOrderData: (state) => {
      state.activeOrderData = initialState;
    },
  },
});

export const { setActiveOrderData, clearActiveOrderData } = activeOrderDataSlice.actions;
export default activeOrderDataSlice.reducer;
