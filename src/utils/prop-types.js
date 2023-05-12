import PropTypes from 'prop-types';
import ingredientType from './types';

export const BurgerIngredientPropType = {
  ingredientData: ingredientType,
  openModal: PropTypes.func.isRequired,
};
export const ModalPropType = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
export const ModalOverlayPropType = {
  isModalOpen: PropTypes.bool.isRequired,
};
export const BurgerConstructorToppingElementPropType = {
  ingredientData: ingredientType,
  index: PropTypes.number.isRequired,
  swapIngredients: PropTypes.func.isRequired,
};
export const ProtectedRouteElementPropType = {
  element: PropTypes.element.isRequired,
};
