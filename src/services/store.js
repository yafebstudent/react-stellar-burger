import { configureStore } from '@reduxjs/toolkit';
import { ingredientsDataAPI } from './ingredientsDataAPI';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsDataAPI.middleware),
});

export default store;
