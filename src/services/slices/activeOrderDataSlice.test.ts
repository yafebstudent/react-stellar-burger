import { setupStore } from '../store';
import { setActiveOrderData, clearActiveOrderData } from './activeOrderDataSlice';

describe('activeOrderDataSlice state tests', () => {
  const initialState = {
    ingredients: [],
    _id: '',
    status: '',
    number: 0,
    createdAt: '',
    updatedAt: '',
    name: '',
  };

  it('Should initially null', () => {
    const store = setupStore();
    const state = store.getState().activeOrderDataReducer;

    expect(state.activeOrderData).toEqual(initialState);
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

    expect(state.activeOrderData).toEqual(initialState);
  });
});
