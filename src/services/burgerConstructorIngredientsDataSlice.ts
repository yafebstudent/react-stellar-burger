import { createSlice } from '@reduxjs/toolkit';
import { IBurgerConstructorIngredientData } from '../utils/types';

const initialState: { burgerConstructorIngredientsData: IBurgerConstructorIngredientData[] } = {
  burgerConstructorIngredientsData: [],
};

const burgerConstructorIngredientsDataSlice = createSlice({
  name: 'burgerConstructorIngredientsData',
  initialState,
  reducers: {
    addIngredientData: (state, action) => {
      if (
        state.burgerConstructorIngredientsData.filter(
          (ingredentData: IBurgerConstructorIngredientData) =>
            ingredentData._id === action.payload._id
        ).length === 0 &&
        action.payload.type === 'bun'
      ) {
        state.burgerConstructorIngredientsData = [
          ...state.burgerConstructorIngredientsData.filter(
            (ingredienData: IBurgerConstructorIngredientData) => ingredienData.type !== 'bun'
          ),
          {
            ...action.payload,
            listKey: window.crypto.randomUUID(),
          },
        ];
      }
      if (action.payload.type !== 'bun') {
        state.burgerConstructorIngredientsData.push({
          ...action.payload,
          listKey: window.crypto.randomUUID(),
        });
      }
    },
    deleteIngredientData: (state, action) => {
      state.burgerConstructorIngredientsData.splice(action.payload, 1);
    },
    addSortedIngredients: (state, action) => {
      state.burgerConstructorIngredientsData = [...action.payload];
    },
    clearBurgerConstructor: (state) => {
      state.burgerConstructorIngredientsData = [];
    },
  },
});

export const {
  addIngredientData,
  deleteIngredientData,
  addSortedIngredients,
  clearBurgerConstructor,
} = burgerConstructorIngredientsDataSlice.actions;
export default burgerConstructorIngredientsDataSlice.reducer;
