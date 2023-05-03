import PropTypes from 'prop-types';
import ingredientType from './types';

export const ingredientDataPropType = {
  ingredientData: ingredientType,
};
export const ingredientsDataPropType = {
  ingredientsData: PropTypes.arrayOf(ingredientType),
};
export const BurgerIngredientPropType = {
  ingredientData: ingredientType,
  setIngredientDetailsModalActive: PropTypes.func.isRequired,
  setactiveIngredientId: PropTypes.func.isRequired,
};
export const ModalPropType = {
  modalActive: PropTypes.bool.isRequired,
  setModalActive: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
export const OrderDetailsPropType = {
  oderId: PropTypes.string.isRequired,
};
