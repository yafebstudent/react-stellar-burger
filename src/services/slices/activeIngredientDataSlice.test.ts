import { setupStore } from '../store';
import {
  setActiveIngredientData,
  clearActiveIngredientData,
  activeIngredientInitialData,
} from './activeIngredientDataSlice';

describe('activeIngredientDataSlice state tests', () => {
  it('Should initial state', () => {
    const store = setupStore();
    const state = store.getState().activeIngredientDataReducer;

    expect(state.activeIngredientData).toEqual(activeIngredientInitialData);
  });

  it('Set a new active order data', () => {
    const store = setupStore();
    let state = store.getState().activeIngredientDataReducer;
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

    store.dispatch(setActiveIngredientData(mockIngredientData));
    state = store.getState().activeIngredientDataReducer;

    const newActiveOrderData = state.activeIngredientData;
    expect(newActiveOrderData).toEqual(mockIngredientData);
  });

  it('Clear active order data', () => {
    const store = setupStore();
    let state = store.getState().activeIngredientDataReducer;

    store.dispatch(clearActiveIngredientData());
    state = store.getState().activeIngredientDataReducer;

    expect(state.activeIngredientData).toEqual(activeIngredientInitialData);
  });
});
