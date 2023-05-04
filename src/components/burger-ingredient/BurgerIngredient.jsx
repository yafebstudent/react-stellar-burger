import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredient.module.css';
import { BurgerIngredientPropType } from '../../utils/prop-types';

const BurgerIngredient = (props) => {
  const { ingredientData, openModal, setactiveIngredientId } = props;
  const burgerIngredientClickHandler = () => {
    openModal();
    setactiveIngredientId(ingredientData._id);
  };

  return (
    <li
      className={`${styles.burgerIngredientsListItem} mb-6`}
      onClick={burgerIngredientClickHandler}
      onKeyDown={burgerIngredientClickHandler}
      role="menuitem"
      tabIndex={0}
    >
      <Counter count={0} size="default" />
      <img
        className={`${styles.image} ml-4 mr-4 mb-2`}
        src={ingredientData.image}
        alt={ingredientData.name}
      />
      <div className={`${styles.price} mb-2`}>
        <h4 className="text text_type_digits-default mr-1">{ingredientData.price}</h4>
        <CurrencyIcon type="primary" />
      </div>
      <h2 className={`${styles.name} text text_type_main-default`}>{ingredientData.name}</h2>
    </li>
  );
};

BurgerIngredient.propTypes = BurgerIngredientPropType;

export default BurgerIngredient;
