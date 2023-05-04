import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import BurgerIngredient from '../burger-ingredient/BurgerIngredient';
import Modal from '../Modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import { ingredientsDataPropType } from '../../utils/prop-types';
import useModal from '../../hooks/useModal';

const BurgerIngredients = (props) => {
  const [currentTab, setCurrentTab] = React.useState('buns');
  const { ingredientsData } = props;
  const { isModalOpen, openModal, closeModal } = useModal();
  const [activeIngredientId, setactiveIngredientId] = useState(null);
  const getActiveIngredientData = () =>
    ingredientsData.find((ingredientData) => ingredientData._id === activeIngredientId);

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
          {ingredientsData.map(
            (ingredientData) =>
              ingredientData.type === 'bun' && (
                <BurgerIngredient
                  key={ingredientData._id}
                  ingredientData={ingredientData}
                  openModal={openModal}
                  setactiveIngredientId={setactiveIngredientId}
                />
              )
          )}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={`${styles.burgerIngredientsList} pl-4`}>
          {ingredientsData.map(
            (ingredientData) =>
              ingredientData.type === 'sauce' && (
                <BurgerIngredient
                  key={ingredientData._id}
                  ingredientData={ingredientData}
                  openModal={openModal}
                  setactiveIngredientId={setactiveIngredientId}
                />
              )
          )}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={`${styles.burgerIngredientsList} pl-4`}>
          {ingredientsData.map(
            (ingredientData) =>
              ingredientData.type === 'main' && (
                <BurgerIngredient
                  key={ingredientData._id}
                  ingredientData={ingredientData}
                  openModal={openModal}
                  setactiveIngredientId={setactiveIngredientId}
                />
              )
          )}
        </ul>
      </div>
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
          {activeIngredientId && (
            <IngredientDetails activeIngredientData={getActiveIngredientData()} />
          )}
        </Modal>
      )}
    </section>
  );
};

BurgerIngredients.propTypes = ingredientsDataPropType;

export default BurgerIngredients;
