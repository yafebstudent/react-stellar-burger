import React, { useMemo } from 'react';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import oderId from '../../utils/data';
import useModal from '../../hooks/useModal';
import { useGetIngredientsDataQuery } from '../../services/ingredientsDataAPI';
import { setOrderDetailsData } from '../../services/orderDetailsDataSlice';
import {
  addIngredientData,
  deleteIngredientData,
} from '../../services/burgerConstructorIngredientsDataSlice';
import burgerIcon from '../../images/burger.png';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { data: ingredientsResponseData } = useGetIngredientsDataQuery();
  const burgerConstructorIngredientsData = useSelector(
    (state) => state.burgerConstructorIngredientsDataReducer.burgerConstructorIngredientsData
  );
  const orderButtonClickHandler = () => {
    openModal();
    dispatch(setOrderDetailsData(oderId));
  };
  const getIngredientDataById = (id) =>
    ingredientsResponseData.data.find((ingredientData) => ingredientData._id === id);
  const [{ isHover }, dropTargetRef] = useDrop({
    accept: 'ingredientItem',
    drop(item) {
      dispatch(
        addIngredientData({
          ...getIngredientDataById(item._id),
        })
      );
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const handleConstructorElementClose = (data) => {
    dispatch(deleteIngredientData(data));
  };
  const totalCost = useMemo(() => {
    const bunsCount = 2;

    return burgerConstructorIngredientsData.reduce((sum, ingredientData) => {
      if (ingredientData.type === 'bun') {
        return sum + ingredientData.price * bunsCount;
      }
      return sum + ingredientData.price;
    }, 0);
  }, [burgerConstructorIngredientsData]);

  return (
    <section
      className={`${styles.burgerConstructor} ${isHover && styles.isDragHover}`}
      ref={dropTargetRef}
    >
      <ul className={`${styles.burgerConstructor__mainList} mt-25 mb-10`}>
        <li className={`${styles.burgerIngredient} mr-4`}>
          {burgerConstructorIngredientsData.filter(
            (ingredientsData) => ingredientsData.type === 'bun'
          ).length === 0 ? (
            <ConstructorElement
              type="top"
              isLocked
              text="Перетяните булочку сюда (верх)"
              price="0"
              thumbnail={burgerIcon}
            />
          ) : (
            burgerConstructorIngredientsData.map(
              (ingredientData) =>
                ingredientData.type === 'bun' && (
                  <ConstructorElement
                    type="top"
                    isLocked
                    text={`${ingredientData.name} (верх)`}
                    price={ingredientData.price}
                    thumbnail={ingredientData.image_mobile}
                    key={`${ingredientData.listKey}top`}
                  />
                )
            )
          )}
        </li>
        <li>
          <ul className={styles.nestedList}>
            {burgerConstructorIngredientsData.map(
              (ingredientData) =>
                ingredientData.type !== 'bun' && (
                  <li className={`${styles.burgerIngredient} mr-2`} key={ingredientData.listKey}>
                    <DragIcon type={ingredientData.type} />
                    <ConstructorElement
                      text={ingredientData.name}
                      price={ingredientData.price}
                      thumbnail={ingredientData.image_mobile}
                      handleClose={() => handleConstructorElementClose(ingredientData)}
                    />
                  </li>
                )
            )}
          </ul>
        </li>
        <li className={`${styles.burgerIngredient} mr-4`}>
          {burgerConstructorIngredientsData.filter(
            (ingredientsData) => ingredientsData.type === 'bun'
          ).length === 0 ? (
            <ConstructorElement
              type="bottom"
              isLocked
              text="Перетяните булочку сюда (низ)"
              price="0"
              thumbnail={burgerIcon}
            />
          ) : (
            burgerConstructorIngredientsData.map(
              (ingredientData) =>
                ingredientData.type === 'bun' && (
                  <ConstructorElement
                    type="bottom"
                    isLocked
                    text={`${ingredientData.name} (низ)`}
                    price={ingredientData.price}
                    thumbnail={ingredientData.image_mobile}
                    key={`${ingredientData.listKey}bottom`}
                  />
                )
            )
          )}
        </li>
      </ul>
      <div className={`${styles.burgerConstructor__checkout} mr-4`}>
        <div className={`${styles.totalPrice} mr-10`}>
          <span className="text text_type_digits-medium mr-2">{totalCost}</span>
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
