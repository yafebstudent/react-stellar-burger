import { setupStore } from '../store';
import { setOrderDetailsData, clearOrderDetailsData, orderDetailsInitialData } from './orderDetailsDataSlice';

describe('orderDetailsDataReducer state tests', () => {
  const initialState = {
    name: '',
    order: {
      number: 0,
    },
    success: false,
  };

  it('Should initial state', () => {
    const store = setupStore();
    const state = store.getState().orderDetailsDataReducer;

    expect(state.orderDetailsData).toEqual(orderDetailsInitialData);
  });

  it('Set a new order details data', () => {
    const store = setupStore();
    let state = store.getState().orderDetailsDataReducer;

    store.dispatch(
      setOrderDetailsData({
        name: 'name',
        order: {
          number: 1,
        },
        success: true,
      })
    );
    state = store.getState().orderDetailsDataReducer;

    const newOrderDetailsData = state.orderDetailsData;
    expect(newOrderDetailsData?.name).toEqual('name');
    expect(newOrderDetailsData?.order).toEqual({
      number: 1,
    });
    expect(newOrderDetailsData?.success).toEqual(true);
  });

  it('Clear user data', () => {
    const store = setupStore();
    let state = store.getState().orderDetailsDataReducer;

    store.dispatch(clearOrderDetailsData());
    state = store.getState().orderDetailsDataReducer;

    expect(state.orderDetailsData).toEqual(orderDetailsInitialData);
  });
});
