import { createSlice } from '@reduxjs/toolkit';

const burgerConstructorIngredientsDataSlice = createSlice({
  name: 'burgerConstructorIngredientsData',
  initialState: {
    burgerConstructorIngredientsData: [],
  },
  reducers: {
    setBurgerConstructorIngredientsData: (state, action) =>
      state.burgerConstructorIngredientsData.push(action.payload),
  },
});

export const { setBurgerConstructorIngredientsData } =
  burgerConstructorIngredientsDataSlice.actions;
export default burgerConstructorIngredientsDataSlice.reducer;
