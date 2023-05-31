/* eslint-disable no-underscore-dangle */
import { setupStore } from '../store';
import {
  addIngredientData,
  deleteIngredientData,
  addSortedIngredients,
  clearBurgerConstructor,
  burgerConstructorSliceInitialState,
} from './burgerConstructorIngredientsDataSlice';

describe('burgerConstructorIngredientsDataSlice state tests', () => {
  it('Should initial state', () => {
    const store = setupStore();
    const state = store.getState().burgerConstructorIngredientsDataReducer;

    expect(state).toEqual(burgerConstructorSliceInitialState);
  });
  describe('Ingredients data management', () => {
    const store = setupStore();
    const mockIngredientData = {
      calories: 1,
      carbohydrates: 2,
      fat: 3,
      image: 'image',
      image_large: 'large',
      image_mobile: 'mobile',
      name: 'name',
      price: 'price',
      proteins: 4,
      type: 'bun',
      uuid: 'uuid',
      __v: 'v',
      _id: 'id',
    };

    it('Add a new ingredient data', () => {
      let state = store.getState().burgerConstructorIngredientsDataReducer;

      store.dispatch(addIngredientData(mockIngredientData));
      state = store.getState().burgerConstructorIngredientsDataReducer;

      const newIngredientData = state.burgerConstructorIngredientsData;

      expect(newIngredientData[0]).toEqual(mockIngredientData);
    });

    it('Delete an ingredient data', () => {
      let state = store.getState().burgerConstructorIngredientsDataReducer;

      store.dispatch(deleteIngredientData(mockIngredientData));
      state = store.getState().burgerConstructorIngredientsDataReducer;

      expect(state).toEqual(burgerConstructorSliceInitialState);
    });

    it('Add sorted ingredients data', () => {
      let state = store.getState().burgerConstructorIngredientsDataReducer;

      store.dispatch(addSortedIngredients([mockIngredientData, mockIngredientData]));
      state = store.getState().burgerConstructorIngredientsDataReducer;

      expect(state.burgerConstructorIngredientsData).toEqual([
        mockIngredientData,
        mockIngredientData,
      ]);
    });
  });

  it('Clear burger constructor', () => {
    const store = setupStore();
    let state = store.getState().burgerConstructorIngredientsDataReducer;

    store.dispatch(clearBurgerConstructor());
    state = store.getState().burgerConstructorIngredientsDataReducer;

    expect(state).toEqual(burgerConstructorSliceInitialState);
  });
});
