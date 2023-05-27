import { combineReducers } from 'redux';
import activeIngredientDataReducer from './slices/activeIngredientDataSlice';
import orderDetailsDataReducer from './slices/orderDetailsDataSlice';
import burgerConstructorIngredientsDataReducer from './slices/burgerConstructorIngredientsDataSlice';
import userDataReducer from './slices/userDataSlice';
import { stellarBurgersAPI } from './stellarBurgersAPI';
import { websocketAPI } from './websocketAPI';

const rootReducer = combineReducers({
  activeIngredientDataReducer,
  orderDetailsDataReducer,
  burgerConstructorIngredientsDataReducer,
  userDataReducer,
  [stellarBurgersAPI.reducerPath]: stellarBurgersAPI.reducer,
  [websocketAPI.reducerPath]: websocketAPI.reducer,
});

export default rootReducer;
