import PropTypes from 'prop-types';
import ingredientType from './types';

export const ingredientsDataPropType = {
  ingredientsData: PropTypes.arrayOf(ingredientType).isRequired,
};
export const BurgerIngredientPropType = {
  ingredientData: ingredientType,
  openModal: PropTypes.func.isRequired,
  setactiveIngredientId: PropTypes.func.isRequired,
};
export const ModalPropType = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
export const ModalOverlayPropType = {
  isModalOpen: PropTypes.bool.isRequired,
};
export const IngredientDetailsPropType = {
  activeIngredientData: ingredientType,
};
export const OrderDetailsPropType = {
  oderId: PropTypes.string.isRequired,
};
