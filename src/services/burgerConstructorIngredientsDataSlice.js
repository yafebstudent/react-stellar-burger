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
      const index = state.burgerConstructorIngredientsData.indexOf(action.payload);

      state.burgerConstructorIngredientsData.splice(index, 1);
    },
    addSortedIngredients: (state, action) => {
      state.burgerConstructorIngredientsData.push({
        ...action.payload,
        listKey: window.crypto.randomUUID(),
      });
    },
  },
});

export const { addIngredientData, deleteIngredientData, addSortedIngredients } =
  burgerConstructorIngredientsDataSlice.actions;
export default burgerConstructorIngredientsDataSlice.reducer;
