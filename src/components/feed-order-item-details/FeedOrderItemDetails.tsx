/* eslint-disable react/no-array-index-key */
import React, { FC, useEffect, useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import getTotalCost from '../../utils/getTotalCost';
import getOrderIngredientsData from '../../utils/getOrderIngredientsData';
import { IIngredientData } from '../../utils/types';
import { useGetIngredientsDataQuery } from '../../services/stellarBurgersAPI';
import styles from './FeedOrderItemDetails.module.css';
import { useGetAllOrdersDataQuery, useGetUserOrdersDataQuery } from '../../services/websocketAPI';
import { setActiveOrderData } from '../../services/slices/activeOrderDataSlice';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';

const FeedOrderItemDetails: FC = () => {
  let content;
  const dispatch = useAppDispatch();
  const { id: orderNumber } = useParams();
  const { pathname } = useLocation();
  const activeOrderData = useAppSelector((state) => state.activeOrderDataReducer.activeOrderData);

  const { data: ingredientsResponseData } = useGetIngredientsDataQuery();
  const {
    data: allOrdersData,
    isError: isAllOrdersDataQueryError,
    isSuccess: allOrdersDataQuerySucces,
    isLoading: isAllOrdersDataQueryLoading,
    isFetching: isAllOrdersDataQueryFetching,
  } = useGetAllOrdersDataQuery();

  const {
    data: userOrdersData,
    isError: isUserOrdersDataQueryError,
    isSuccess: userOrdersDataQuerySucces,
    isLoading: isUserOrdersDataQueryLoading,
    isFetching: isUserOrdersDataQueryFetching,
  } = useGetUserOrdersDataQuery();
  useEffect(() => {
    let activeOrder;

    if (
      allOrdersDataQuerySucces &&
      userOrdersDataQuerySucces &&
      ingredientsResponseData &&
      allOrdersData?.success
    ) {
      if (pathname.includes('feed')) {
        activeOrder = allOrdersData?.orders.filter(
          (item) => item.number === Number(orderNumber)
        )[0];
      }
      if (pathname.includes('profile')) {
        activeOrder = userOrdersData?.orders.filter(
          (item) => item.number === Number(orderNumber)
        )[0];
      }
      dispatch(setActiveOrderData(activeOrder));
    }
  }, [
    dispatch,
    ingredientsResponseData,
    allOrdersData,
    userOrdersData,
    orderNumber,
    allOrdersDataQuerySucces,
    userOrdersDataQuerySucces,
    pathname,
  ]);

  const orderIngredientsData = useMemo(() => {
    if (
      activeOrderData &&
      ingredientsResponseData &&
      ingredientsResponseData?.success &&
      allOrdersData &&
      userOrdersData
    ) {
      return getOrderIngredientsData(activeOrderData.ingredients, ingredientsResponseData.data);
    }
    return null;
  }, [allOrdersData, userOrdersData, activeOrderData, ingredientsResponseData]);

  if (isAllOrdersDataQueryError || isUserOrdersDataQueryError)
    content = <p className="text text_type_main-medium">An error has occurred with orders data!</p>;
  if (
    !activeOrderData ||
    !activeOrderData._id ||
    isAllOrdersDataQueryLoading ||
    isUserOrdersDataQueryLoading ||
    isAllOrdersDataQueryFetching ||
    isUserOrdersDataQueryFetching ||
    allOrdersData ||
    userOrdersData
  ) {
    content = (
      <div
        style={{
          width: '720px',
          height: '720px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }
  if (activeOrderData && activeOrderData._id !== '') {
    content = (
      <>
        <p className="text text_type_digits-default mt-4">#{activeOrderData.number}</p>
        <p className="text text_type_main-medium mt-10">{activeOrderData.name}</p>
        <p className={`${styles.status} text text_type_main-default mt-3`}>
          {activeOrderData.status === 'done' ? `Выполнен` : `Готовится`}
        </p>
        <p className="text text_type_main-medium  mt-15">Состав:</p>
        <ul className={styles.ingredientsList}>
          {orderIngredientsData &&
            orderIngredientsData.map((ingredientsListItemData, index, array) => {
              if (index <= array.findIndex((item) => item._id === ingredientsListItemData._id)) {
                return (
                  <li className={styles.ingredientsList__item} key={index}>
                    <img
                      className={styles.ingredientImage}
                      src={ingredientsListItemData.image_mobile}
                      alt={ingredientsListItemData.name}
                    />
                    <p className="text text_type_main-small ml-2">{ingredientsListItemData.name}</p>
                    <p className={`${styles.ingredientPrice} text text_type_digits-default`}>
                      {
                        orderIngredientsData.filter(
                          (orderIngredientData) =>
                            orderIngredientData._id === ingredientsListItemData._id
                        ).length
                      }
                      &nbsp;x {ingredientsListItemData.price} <CurrencyIcon type="primary" />
                    </p>
                  </li>
                );
              }
              return null;
            })}
        </ul>
        <div className={`${styles.footer} mt-10`}>
          {activeOrderData && (
            <p className={`${styles.timestamp} text text_type_main-default text_color_inactive`}>
              {new Date(activeOrderData.createdAt).toLocaleString()}
            </p>
          )}
          {activeOrderData && (
            <p className={`${styles.totalCost} text text_type_digits-default ml-2`}>
              {orderIngredientsData && getTotalCost(orderIngredientsData as IIngredientData[], 1)}
              <CurrencyIcon type="primary" />
            </p>
          )}
        </div>
      </>
    );
  }

  return <main className={`${styles.feedOrderItemDetails} p-10`}>{content}</main>;
};

export default FeedOrderItemDetails;
