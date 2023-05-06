import { createSlice } from '@reduxjs/toolkit';

const activeIngredientDataSlice = createSlice({
  name: 'activeIngredientData',
  initialState: {
    activeIngredientData: null,
  },
  reducers: {
    setActiveIngredientData: (state, action) => {
      state.activeIngredientData = action.payload;
    },
    clearActiveIngredientData: (state) => {
      state.activeIngredientData = null;
    },
  },
});

export const { setActiveIngredientData, clearActiveIngredientData } =
  activeIngredientDataSlice.actions;
export default activeIngredientDataSlice.reducer;
