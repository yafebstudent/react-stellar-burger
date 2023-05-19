import { createSlice } from '@reduxjs/toolkit';

const activeIngredientInitialData = {
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: '',
  image_large: '',
  image_mobile: '',
  name: '',
  price: 0,
  proteins: '',
  type: '',
  uuid: '',
  __v: '',
  _id: '',
};

const activeIngredientDataSlice = createSlice({
  name: 'activeIngredientData',
  initialState: { activeIngredientData: activeIngredientInitialData },
  reducers: {
    setActiveIngredientData: (state, action) => {
      state.activeIngredientData = action.payload;
    },
    clearActiveIngredientData: (state) => {
      state.activeIngredientData = activeIngredientInitialData;
    },
  },
});

export const { setActiveIngredientData, clearActiveIngredientData } =
  activeIngredientDataSlice.actions;
export default activeIngredientDataSlice.reducer;
