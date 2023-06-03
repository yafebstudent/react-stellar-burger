/* eslint-disable react/no-array-index-key */
import React, { useCallback, FC } from 'react';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useGetIngredientsDataQuery,
  useGetOrderDataMutation,
} from '../../services/stellarBurgersAPI';
import {
  clearOrderDetailsData,
  setOrderDetailsData,
} from '../../services/slices/orderDetailsDataSlice';
import {
  addIngredientData,
  addSortedIngredients,
  clearBurgerConstructor,
} from '../../services/slices/burgerConstructorIngredientsDataSlice';
import burgerIcon from '../../images/burger.png';
import BurgerConstructorToppingElement from '../burger-constructor-topping-element/BurgerConstructorToppingElement';
import styles from './BurgerConstructor.module.css';
import { IIngredientData } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import getCookie from '../../utils/getCookie';
import getTotalCost from '../../utils/getTotalCost';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import OrderDetails from '../order-details/OrderDetails';
import useModal from '../../hooks/useModal';
import Modal from '../Modal/Modal';

const BurgerConstructor: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthUser = !!getCookie('accessToken');
  const { isModalOpen, openModal, closeModal } = useModal();
  const { data: ingredientsResponseData } = useGetIngredientsDataQuery();
  const [getOrderData, { isLoading }] = useGetOrderDataMutation();
  const burgerConstructorIngredientsData = useAppSelector(
    (state) => state.burgerConstructorIngredientsDataReducer.burgerConstructorIngredientsData
  );
  const orderButtonClickHandler = () => {
    if (isAuthUser) {
      openModal();
      getOrderData({
        ingredients: [
          ...burgerConstructorIngredientsData.map((ingredientData) => ingredientData._id),
        ],
      })
        .then((data) => {
          if ('data' in data) {
            dispatch(setOrderDetailsData(data.data));
          }
          dispatch(clearBurgerConstructor());
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(`An error has occurred with order data! ${error.message}`);
        });
    } else {
      navigate('/login', { state: { from: location } });
    }
  };
  const getIngredientDataById = (id: string) =>
    ingredientsResponseData?.data.find((ingredientData) => ingredientData._id === id);
  const [{ isHover: isConstructorHover }, constructorRef] = useDrop({
    accept: 'ingredientItem',
    drop(item: IIngredientData) {
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
  const isBunsInBurgerConstructor = () => {
    return (
      burgerConstructorIngredientsData.filter((ingredientData) => ingredientData.type === 'bun')
        .length > 0
    );
  };

  const modalCloseHandler = () => {
    closeModal();
    dispatch(clearOrderDetailsData());
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <section
        className={`${styles.burgerConstructor} ${isConstructorHover && styles.isDragHover}`}
        ref={constructorRef}
      >
        <ul className={`${styles.burgerConstructor__mainList} mt-25 mb-10`}>
          <li className={`${styles.burgerIngredient} mr-4`}>
            {!isBunsInBurgerConstructor() ? (
              <ConstructorElement
                type="top"
                isLocked
                text="Перетяните булочку сюда (верх)"
                price={0}
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
                      key={`${ingredientData._id}up`}
                    />
                  )
              )
            )}
          </li>
          <li>
            <ul className={styles.nestedList}>
              {burgerConstructorIngredientsData.map(
                (ingredientData, index: number) =>
                  ingredientData.type !== 'bun' && (
                    <BurgerConstructorToppingElement
                      ingredientData={ingredientData}
                      index={index}
                      swapIngredients={swapIngredients}
                      key={ingredientData.listKey}
                    />
                  )
              )}
            </ul>
          </li>
          <li className={`${styles.burgerIngredient} mr-4`}>
            {!isBunsInBurgerConstructor() ? (
              <ConstructorElement
                type="bottom"
                isLocked
                text="Перетяните булочку сюда (низ)"
                price={0}
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
                      key={`${ingredientData._id}bottom`}
                    />
                  )
              )
            )}
          </li>
        </ul>
        <div className={`${styles.burgerConstructor__checkout} mr-4`}>
          <div className={`${styles.totalPrice} mr-10`}>
            <span className="text text_type_digits-medium mr-2">
              {getTotalCost(burgerConstructorIngredientsData, 2)}
            </span>
            <figure className={styles.currencyIcon}>
              <CurrencyIcon type="primary" />
            </figure>
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={orderButtonClickHandler}
            disabled={!isBunsInBurgerConstructor()}
          >
            Оформить заказ
          </Button>
        </div>
        {isModalOpen && (
          <Modal isModalOpen={isModalOpen} openModal={openModal} closeModal={modalCloseHandler}>
            {isLoading ? (
              <div style={{ minWidth: '720px' }}>
                <LoadingSpinner />
              </div>
            ) : (
              <OrderDetails />
            )}
          </Modal>
        )}
      </section>
    </DndProvider>
  );
};

export default BurgerConstructor;
