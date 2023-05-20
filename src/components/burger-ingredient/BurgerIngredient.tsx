import React, { FC } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import styles from './BurgerIngredient.module.css';
import { setActiveIngredientData } from '../../services/activeIngredientDataSlice';
import { IBurgerConstructorIngredientData, IBurgerIngredientProps } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const BurgerIngredient: FC<IBurgerIngredientProps> = (props) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { ingredientData, openModal } = props;
  const burgerIngredientClickHandler = () => {
    openModal();
    dispatch(setActiveIngredientData(ingredientData));
  };
  const [, dragElementRef] = useDrag({
    type: 'ingredientItem',
    item: { _id: ingredientData._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const burgerConstructorIngredientsData = useAppSelector(
    (state) => state.burgerConstructorIngredientsDataReducer.burgerConstructorIngredientsData
  );
  const ingredientCount = burgerConstructorIngredientsData.filter(
    (constructorIngredientData: IBurgerConstructorIngredientData) =>
      constructorIngredientData._id === ingredientData._id
  ).length;

  return (
    <li
      className={`${styles.burgerIngredientsListItem} mb-6`}
      onClick={burgerIngredientClickHandler}
      onKeyDown={burgerIngredientClickHandler}
      role="menuitem"
      tabIndex={0}
      ref={dragElementRef}
    >
      <Link to={`/ingredients/${ingredientData._id}`} state={{ background: location }}>
        {ingredientCount > 0 && (
          <Counter
            count={ingredientData.type === 'bun' ? ingredientCount + 1 : ingredientCount}
            size="default"
          />
        )}
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
      </Link>
    </li>
  );
};

export default BurgerIngredient;
