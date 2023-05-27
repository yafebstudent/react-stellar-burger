import { combineReducers } from 'redux';
import activeIngredientDataReducer from './slices/activeIngredientDataSlice';
import activeOrderDataReducer from './slices/activeOrderDataSlice';
import orderDetailsDataReducer from './slices/orderDetailsDataSlice';
import burgerConstructorIngredientsDataReducer from './slices/burgerConstructorIngredientsDataSlice';
import userDataReducer from './slices/userDataSlice';
import { stellarBurgersAPI } from './stellarBurgersAPI';
import { websocketAPI } from './websocketAPI';

const rootReducer = combineReducers({
  activeIngredientDataReducer,
  activeOrderDataReducer,
  orderDetailsDataReducer,
  burgerConstructorIngredientsDataReducer,
  userDataReducer,
  [stellarBurgersAPI.reducerPath]: stellarBurgersAPI.reducer,
  [websocketAPI.reducerPath]: websocketAPI.reducer,
});

export default rootReducer;
