import { combineReducers } from 'redux';
import activeIngredientDataReducer from './activeIngredientDataSlice';
import orderDetailsDataReducer from './orderDetailsDataSlice';
import burgerConstructorIngredientsDataReducer from './burgerConstructorIngredientsDataSlice';
import { ingredientsDataAPI } from './ingredientsDataAPI';

const rootReducer = combineReducers({
  activeIngredientDataReducer,
  orderDetailsDataReducer,
  burgerConstructorIngredientsDataReducer,
  [ingredientsDataAPI.reducerPath]: ingredientsDataAPI.reducer,
});

export default rootReducer;
