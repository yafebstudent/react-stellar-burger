import { setupStore } from '../store';
import { clearUserData, setUser } from './userDataSlice';

describe('userDataSlice state tests', () => {
  it('Should initially null', () => {
    const store = setupStore();
    const state = store.getState().userDataReducer;

    expect(state.userData).toEqual(null);
  });

  it('Set a new user data', () => {
    const store = setupStore();
    let state = store.getState().userDataReducer;

    store.dispatch(
      setUser({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        success: true,
        user: {
          email: 'email',
          name: 'name',
        },
      })
    );
    state = store.getState().userDataReducer;

    const newUserData = state.userData;
    expect(newUserData?.accessToken).toEqual('accessToken');
    expect(newUserData?.refreshToken).toEqual('refreshToken');
    expect(newUserData?.success).toEqual(true);
    expect(newUserData?.user).toEqual({
      email: 'email',
      name: 'name',
    });
  });

  it('Clear user data', () => {
    const store = setupStore();
    let state = store.getState().userDataReducer;

    store.dispatch(clearUserData());
    state = store.getState().userDataReducer;

    expect(state.userData).toEqual(null);
  });
});
