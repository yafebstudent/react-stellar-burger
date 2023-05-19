import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    clearUserData: () => initialState,
    setUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { clearUserData, setUser } = userDataSlice.actions;
export default userDataSlice.reducer;
