import { configureStore } from '@reduxjs/toolkit';
import { stellarBurgersAPI } from './stellarBurgersAPI';
import rootReducer from './rootReducer';
import { websocketAPI } from './websocketAPI';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([stellarBurgersAPI.middleware, websocketAPI.middleware]),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
