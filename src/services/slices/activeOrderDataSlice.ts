import { createSlice } from '@reduxjs/toolkit';
import { IOrderData } from '../../utils/types';

export const activeOrderDataSliceInitialState: IOrderData = {
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
  initialState: { activeOrderData: activeOrderDataSliceInitialState },
  reducers: {
    setActiveOrderData: (state, action) => {
      state.activeOrderData = action.payload;
    },
    clearActiveOrderData: (state) => {
      state.activeOrderData = activeOrderDataSliceInitialState;
    },
  },
});

export const { setActiveOrderData, clearActiveOrderData } = activeOrderDataSlice.actions;
export default activeOrderDataSlice.reducer;
