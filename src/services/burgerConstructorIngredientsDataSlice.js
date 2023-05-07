import { createSlice } from '@reduxjs/toolkit';

const burgerConstructorIngredientsDataSlice = createSlice({
  name: 'burgerConstructorIngredientsData',
  initialState: {
    burgerConstructorIngredientsData: [],
  },
  reducers: {
    addIngredientData: (state, action) => {
      if (
        state.burgerConstructorIngredientsData.filter(
          (ingredentData) => ingredentData._id === action.payload._id
        ).length === 0 &&
        action.payload.type === 'bun'
      ) {
        state.burgerConstructorIngredientsData = [
          ...state.burgerConstructorIngredientsData.filter(
            (ingredienData) => ingredienData.type !== 'bun'
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
  },
});

export const { addIngredientData, deleteIngredientData, addSortedIngredients } =
  burgerConstructorIngredientsDataSlice.actions;
export default burgerConstructorIngredientsDataSlice.reducer;
