import React from 'react';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import oderId from '../../utils/data';
import useModal from '../../hooks/useModal';
import { useGetIngredientsDataQuery } from '../../services/ingredientsDataAPI';
import { setOrderDetailsData } from '../../services/orderDetailsDataSlice';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { data: ingredientsResponseData } = useGetIngredientsDataQuery();
  const orderButtonClickHandler = () => {
    openModal();
    dispatch(setOrderDetailsData(oderId));
  };

  return (
    <section className={styles.burgerConstructor}>
      <ul className={`${styles.burgerConstructor__mainList} mt-25 mb-10`}>
        <li className={`${styles.burgerIngredient} mr-4`}>
          <ConstructorElement
            type="top"
            isLocked
            text={`${ingredientsResponseData.data[0].name} (верх)`}
            price={ingredientsResponseData.data[0].price}
            thumbnail={ingredientsResponseData.data[0].image_mobile}
          />
        </li>
        <li>
          <ul className={styles.nestedList}>
            {ingredientsResponseData.data.map(
              (ingredientData, index, array) =>
                index > 0 &&
                index < array.length && (
                  <li key={ingredientData._id} className={`${styles.burgerIngredient} mr-2`}>
                    <DragIcon type={ingredientData.type} />
                    <ConstructorElement
                      text={ingredientData.name}
                      price={ingredientData.price}
                      thumbnail={ingredientData.image_mobile}
                    />
                  </li>
                )
            )}
          </ul>
        </li>
        <li className={`${styles.burgerIngredient} mr-4`}>
          <ConstructorElement
            type="bottom"
            isLocked
            text={`${ingredientsResponseData.data[0].name} (низ)`}
            price={ingredientsResponseData.data[0].price}
            thumbnail={ingredientsResponseData.data[0].image_mobile}
          />
        </li>
      </ul>
      <div className={`${styles.burgerConstructor__checkout} mr-4`}>
        <div className={`${styles.totalPrice} mr-10`}>
          <span className="text text_type_digits-medium mr-2">610</span>
          <figure className={styles.currencyIcon}>
            <CurrencyIcon type="primary" />
          </figure>
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => orderButtonClickHandler()}
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
