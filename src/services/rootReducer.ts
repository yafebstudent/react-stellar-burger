import { combineReducers } from 'redux';
import activeIngredientDataReducer from './activeIngredientDataSlice';
import orderDetailsDataReducer from './orderDetailsDataSlice';
import burgerConstructorIngredientsDataReducer from './burgerConstructorIngredientsDataSlice';
import userDataReducer from './userDataSlice';
import { stellarBurgersAPI } from './stellarBurgersAPI';

const rootReducer = combineReducers({
  activeIngredientDataReducer,
  orderDetailsDataReducer,
  burgerConstructorIngredientsDataReducer,
  userDataReducer,
  [stellarBurgersAPI.reducerPath]: stellarBurgersAPI.reducer,
});

export default rootReducer;
