import { createSlice } from '@reduxjs/toolkit';

const orderDetailsDataSlice = createSlice({
  name: 'orderDetailsData',
  initialState: {
    orderDetailsData: null,
  },
  reducers: {
    setOrderDetailsData: (state, action) => {
      state.orderDetailsData = action.payload;
    },
    clearOrderDetailsData: (state) => {
      state.orderDetailsData = null;
    },
  },
});

export const { setOrderDetailsData, clearOrderDetailsData } = orderDetailsDataSlice.actions;
export default orderDetailsDataSlice.reducer;
