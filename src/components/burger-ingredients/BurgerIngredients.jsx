import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import styles from './BurgerIngredients.module.css';
import BurgerIngredient from '../burger-ingredient/BurgerIngredient';
import Modal from '../Modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import useModal from '../../hooks/useModal';
import { useGetIngredientsDataQuery } from '../../services/ingredientsDataAPI';
import { clearActiveIngredientData } from '../../services/activeIngredientDataSlice';

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = React.useState('buns');
  const { isModalOpen, openModal, closeModal } = useModal();
  const { data: ingredientsResponseData } = useGetIngredientsDataQuery();
  const modalCloseButtonClickHandler = () => {
    closeModal();
    dispatch(clearActiveIngredientData());
  };

  return (
    <section className={`${styles.burgerIngredients} mb-10`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${styles.burgerIngredients__tabs} mb-10`}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={setCurrentTab}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={setCurrentTab}>
          Соусы
        </Tab>
        <Tab value="toppings" active={currentTab === 'toppings'} onClick={setCurrentTab}>
          Начинки
        </Tab>
      </div>
      <div className={styles.burgerIngredients__items}>
        <h2 className="text text_type_main-medium mb-6">Булки</h2>
        <ul className={`${styles.burgerIngredientsList} pl-4`}>
          {ingredientsResponseData.data.map(
            (ingredientData) =>
              ingredientData.type === 'bun' && (
                <BurgerIngredient
                  key={ingredientData._id}
                  ingredientData={ingredientData}
                  openModal={openModal}
                />
              )
          )}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={`${styles.burgerIngredientsList} pl-4`}>
          {ingredientsResponseData.data.map(
            (ingredientData) =>
              ingredientData.type === 'sauce' && (
                <BurgerIngredient
                  key={ingredientData._id}
                  ingredientData={ingredientData}
                  openModal={openModal}
                />
              )
          )}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={`${styles.burgerIngredientsList} pl-4`}>
          {ingredientsResponseData.data.map(
            (ingredientData) =>
              ingredientData.type === 'main' && (
                <BurgerIngredient
                  key={ingredientData._id}
                  ingredientData={ingredientData}
                  openModal={openModal}
                />
              )
          )}
        </ul>
      </div>
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} closeModal={modalCloseButtonClickHandler}>
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;
