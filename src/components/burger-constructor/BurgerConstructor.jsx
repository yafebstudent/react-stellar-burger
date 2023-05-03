import React, { useState } from 'react';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import oderId from '../../utils/data';
import { ingredientsDataPropType } from '../../utils/prop-types';

const BurgerConstructor = (props) => {
  const { ingredientsData } = props;
  const [orderDetailsModalActive, setOrderDetailsModalActive] = useState(false);

  return (
    <section className={styles.burgerConstructor}>
      <ul className={`${styles.burgerConstructor__mainList} mt-25 mb-10`}>
        <li className={`${styles.burgerIngredient} mr-4`}>
          <ConstructorElement
            type="top"
            isLocked
            text={`${ingredientsData[0].name} (верх)`}
            price={ingredientsData[0].price}
            thumbnail={ingredientsData[0].image_mobile}
          />
        </li>
        <li>
          <ul className={styles.nestedList}>
            {ingredientsData.map(
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
            text={`${ingredientsData[0].name} (низ)`}
            price={ingredientsData[0].price}
            thumbnail={ingredientsData[0].image_mobile}
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
          onClick={() => {
            setOrderDetailsModalActive(true);
          }}
        >
          Оформить заказ
        </Button>
      </div>
      {orderDetailsModalActive && (
        <Modal modalActive={orderDetailsModalActive} setModalActive={setOrderDetailsModalActive}>
          {oderId && <OrderDetails oderId={oderId} />}
        </Modal>
      )}
    </section>
  );
};

BurgerConstructor.propTypes = ingredientsDataPropType;

export default BurgerConstructor;
