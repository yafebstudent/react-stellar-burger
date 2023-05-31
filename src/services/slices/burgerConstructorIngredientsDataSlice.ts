import { createSlice } from '@reduxjs/toolkit';
import { IBurgerConstructorIngredientsDataState, IIngredientData } from '../../utils/types';

export const burgerConstructorSliceInitialState: IBurgerConstructorIngredientsDataState = {
  burgerConstructorIngredientsData: [],
};

const burgerConstructorIngredientsDataSlice = createSlice({
  name: 'burgerConstructorIngredientsData',
  initialState: burgerConstructorSliceInitialState,
  reducers: {
    addIngredientData: (state, action) => {
      if (
        state.burgerConstructorIngredientsData.filter(
          (ingredentData: IIngredientData) => ingredentData._id === action.payload._id
        ).length === 0 &&
        action.payload.type === 'bun'
      ) {
        state.burgerConstructorIngredientsData = [
          ...state.burgerConstructorIngredientsData.filter(
            (ingredienData: IIngredientData) => ingredienData.type !== 'bun'
          ),
          {
            ...action.payload,
          },
        ];
      }
      if (action.payload.type !== 'bun') {
        state.burgerConstructorIngredientsData.push({
          ...action.payload,
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
