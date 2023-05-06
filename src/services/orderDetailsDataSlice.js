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
  },
});

export const { setOrderDetailsData } = orderDetailsDataSlice.actions;
export default orderDetailsDataSlice.reducer;
