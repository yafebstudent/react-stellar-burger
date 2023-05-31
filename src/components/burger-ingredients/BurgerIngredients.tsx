/* eslint-disable no-restricted-globals */
import React, { useState, FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import { useGetIngredientsDataQuery } from '../../services/stellarBurgersAPI';
import getCurrentTabName from './getCurrentTabName';
import BurgerIngredient from '../burger-ingredient/BurgerIngredient';

const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState('buns');
  const { data: ingredientsResponseData } = useGetIngredientsDataQuery();
  const scrollHandler = () => {
    setCurrentTab(getCurrentTabName(styles.burgerIngredients__items) as string);
  };
  const tabClickHandler = (tabName: string) => {
    setCurrentTab(tabName);
    document.querySelector(`#${tabName}`)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  return (
    <section className={`${styles.burgerIngredients} mb-10`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${styles.burgerIngredients__tabs} mb-10`}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={tabClickHandler}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={tabClickHandler}>
          Соусы
        </Tab>
        <Tab value="toppings" active={currentTab === 'toppings'} onClick={tabClickHandler}>
          Начинки
        </Tab>
      </div>
      <div className={styles.burgerIngredients__items} onScroll={scrollHandler}>
        <h2 className="text text_type_main-medium mb-6" id="buns">
          Булки
        </h2>
        <ul className={`${styles.burgerIngredientsList} pl-4`}>
          {ingredientsResponseData?.data.map(
            (ingredientData) =>
              ingredientData.type === 'bun' && (
                <BurgerIngredient key={ingredientData._id} ingredientData={ingredientData} />
              )
          )}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" id="sauces">
          Соусы
        </h2>
        <ul className={`${styles.burgerIngredientsList} pl-4`}>
          {ingredientsResponseData?.data.map(
            (ingredientData) =>
              ingredientData.type === 'sauce' && (
                <BurgerIngredient key={ingredientData._id} ingredientData={ingredientData} />
              )
          )}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" id="toppings">
          Начинки
        </h2>
        <ul className={`${styles.burgerIngredientsList} pl-4`}>
          {ingredientsResponseData?.data.map(
            (ingredientData) =>
              ingredientData.type === 'main' && (
                <BurgerIngredient key={ingredientData._id} ingredientData={ingredientData} />
              )
          )}
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;
