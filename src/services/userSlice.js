import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
