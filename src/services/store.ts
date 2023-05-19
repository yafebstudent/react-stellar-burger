import { configureStore } from '@reduxjs/toolkit';
import { stellarBurgersAPI } from './stellarBurgersAPI';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stellarBurgersAPI.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
