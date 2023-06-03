import { setupStore } from '../store';
import {
  setActiveOrderData,
  clearActiveOrderData,
  activeOrderDataSliceInitialState,
} from './activeOrderDataSlice';

describe('activeOrderDataSlice state tests', () => {
  it('Should initial state', () => {
    const store = setupStore();
    const state = store.getState().activeOrderDataReducer;

    expect(state.activeOrderData).toEqual(activeOrderDataSliceInitialState);
  });

  it('Set a new active order data', () => {
    const store = setupStore();
    let state = store.getState().activeOrderDataReducer;
    const mockActiveOrderData = {
      ingredients: ['ingredient'],
      _id: 'id',
      status: 'status',
      number: 1,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      name: 'name',
    };

    store.dispatch(setActiveOrderData(mockActiveOrderData));
    state = store.getState().activeOrderDataReducer;

    const newActiveOrderData = state.activeOrderData;
    expect(newActiveOrderData).toEqual(mockActiveOrderData);
  });

  it('Clear active order data', () => {
    const store = setupStore();
    let state = store.getState().activeOrderDataReducer;

    store.dispatch(clearActiveOrderData());
    state = store.getState().activeOrderDataReducer;

    expect(state.activeOrderData).toEqual(activeOrderDataSliceInitialState);
  });
});
