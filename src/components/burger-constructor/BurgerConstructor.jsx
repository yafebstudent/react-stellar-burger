import React, { useCallback, useMemo } from 'react';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import useModal from '../../hooks/useModal';
import {
  useGetIngredientsDataQuery,
  useGetOrderDataMutation,
} from '../../services/ingredientsDataAPI';
import { clearOrderDetailsData, setOrderDetailsData } from '../../services/orderDetailsDataSlice';
import {
  addIngredientData,
  addSortedIngredients,
} from '../../services/burgerConstructorIngredientsDataSlice';
import burgerIcon from '../../images/burger.png';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import BurgerConstructorToppingElement from '../burger-constructor-topping-element/BurgerConstructorToppingElement';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { data: ingredientsResponseData } = useGetIngredientsDataQuery();
  const burgerConstructorIngredientsData = useSelector(
    (state) => state.burgerConstructorIngredientsDataReducer.burgerConstructorIngredientsData
  );
  const [getOrderData, { isLoading }] = useGetOrderDataMutation();
  const orderButtonClickHandler = () => {
    openModal();
    getOrderData(
      JSON.stringify({
        ingredients: [
          ...burgerConstructorIngredientsData.map((ingredientData) => ingredientData._id),
        ],
      })
    )
      .then((data) => {
        dispatch(setOrderDetailsData(data.data));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(`An error has occurred with order data! ${error.message}`);
      });
  };
  const modalCloseHandler = () => {
    closeModal();
    dispatch(clearOrderDetailsData());
  };

  const getIngredientDataById = (id) =>
    ingredientsResponseData.data.find((ingredientData) => ingredientData._id === id);
  const [{ isHover: isConstructorHover }, constructorRef] = useDrop({
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

  const totalCost = useMemo(() => {
    const bunsCount = 2;

    return burgerConstructorIngredientsData.reduce((sum, ingredientData) => {
      if (ingredientData.type === 'bun') {
        return sum + ingredientData.price * bunsCount;
      }
      return sum + ingredientData.price;
    }, 0);
  }, [burgerConstructorIngredientsData]);

  const swapIngredients = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = burgerConstructorIngredientsData[dragIndex];

      if (dragItem) {
        const getSortedIngredientsData = () => {
          const coppiedStateArray = [...burgerConstructorIngredientsData];
          const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

          coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

          return coppiedStateArray;
        };

        dispatch(addSortedIngredients(getSortedIngredientsData()));
      }
    },
    [burgerConstructorIngredientsData, dispatch]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <section
        className={`${styles.burgerConstructor} ${isConstructorHover && styles.isDragHover}`}
        ref={constructorRef}
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
                (ingredientData, index) =>
                  ingredientData.type !== 'bun' && (
                    <BurgerConstructorToppingElement
                      ingredientData={ingredientData}
                      key={ingredientData.listKey}
                      index={index}
                      swapIngredients={swapIngredients}
                    />
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
          <Modal isModalOpen={isModalOpen} closeModal={modalCloseHandler}>
            {isLoading ? <LoadingSpinner /> : <OrderDetails />}
          </Modal>
        )}
      </section>
    </DndProvider>
  );
};

export default BurgerConstructor;
