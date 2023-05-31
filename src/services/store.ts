import { configureStore } from '@reduxjs/toolkit';
import { stellarBurgersAPI } from './stellarBurgersAPI';
import rootReducer from './rootReducer';
import { websocketAPI } from './websocketAPI';

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([stellarBurgersAPI.middleware, websocketAPI.middleware]),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
