import { createSlice } from '@reduxjs/toolkit';
import { IOrderDetailsDataState } from '../../utils/types';

export const orderDetailsInitialData: IOrderDetailsDataState = {
  name: '',
  order: {
    number: 0,
  },
  success: false,
};

const orderDetailsDataSlice = createSlice({
  name: 'orderDetailsData',
  initialState: {
    orderDetailsData: orderDetailsInitialData,
  },
  reducers: {
    setOrderDetailsData: (state, action) => {
      state.orderDetailsData = action.payload;
    },
    clearOrderDetailsData: (state) => {
      state.orderDetailsData = orderDetailsInitialData;
    },
  },
});

export const { setOrderDetailsData, clearOrderDetailsData } = orderDetailsDataSlice.actions;
export default orderDetailsDataSlice.reducer;
