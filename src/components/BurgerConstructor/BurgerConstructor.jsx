import React from 'react';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';

const BurgerConstructor = (props) => {
  const { ingredientsData } = props;

  return (
    <section className={styles.burgerConstructor}>
      <ul className={`${styles.burgerConstructor__list} mt-25 mb-10`}>
        <li className={styles.burgerIngredient}>
          <ConstructorElement
            type="top"
            isLocked
            text={`${ingredientsData[0].name} (верх)`}
            price={200}
            thumbnail={ingredientsData[0].image_mobile}
          />
        </li>
        <li className={styles.burgerIngredient}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={ingredientsData[0].image_mobile}
          />
        </li>
        <li className={styles.burgerIngredient}>
          <ConstructorElement
            type="bottom"
            isLocked
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={ingredientsData[0].image_mobile}
          />
        </li>
      </ul>
      <div className={`${styles.burgerConstructor__checkout}`}>
        <div className={`${styles.totalPrice} mr-10`}>
          <span className="text text_type_digits-medium mr-2">610</span>
          <figure className={styles.currencyIcon}>
            <CurrencyIcon type="primary" />
          </figure>
        </div>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
