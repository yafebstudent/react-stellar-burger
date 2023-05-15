import { combineReducers } from 'redux';
import activeIngredientDataReducer from './activeIngredientDataSlice';
import orderDetailsDataReducer from './orderDetailsDataSlice';
import burgerConstructorIngredientsDataReducer from './burgerConstructorIngredientsDataSlice';
import userSliceReducer from './userSlice';
import { stellarBurgersAPI } from './stellarBurgersAPI';

const rootReducer = combineReducers({
  activeIngredientDataReducer,
  orderDetailsDataReducer,
  burgerConstructorIngredientsDataReducer,
  userSliceReducer,
  [stellarBurgersAPI.reducerPath]: stellarBurgersAPI.reducer,
});

export default rootReducer;
