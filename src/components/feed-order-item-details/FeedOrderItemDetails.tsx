/* eslint-disable react/no-array-index-key */
import React, { FC, useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../hooks/hooks';
import getTotalCost from '../../utils/getTotalCost';
import getOrderIngredientsData from '../../utils/getOrderIngredientsData';
import { IIngredientData } from '../../utils/types';
import { useGetIngredientsDataQuery } from '../../services/stellarBurgersAPI';
import styles from './FeedOrderItemDetails.module.css';

const FeedOrderItemDetails: FC = () => {
  const activeOrderData = useAppSelector((state) => state.activeOrderDataReducer.activeOrderData);
  const { data: ingredientsResponseData } = useGetIngredientsDataQuery();
  const {
    status,
    number: orderNumber,
    createdAt,
    name,
    ingredients: ingredientsID,
  } = activeOrderData;
  const orderIngredientsData = useMemo(() => {
    if (ingredientsID && ingredientsResponseData) {
      return getOrderIngredientsData(ingredientsID, ingredientsResponseData.data);
    }
    return null;
  }, [ingredientsID, ingredientsResponseData]);

  return (
    <main className={`${styles.feedOrderItemDetails} p-10`}>
      <p className="text text_type_digits-default mt-4">#{orderNumber}</p>
      <p className="text text_type_main-medium mt-10">{name}</p>
      <p className={`${styles.status} text text_type_main-default mt-3`}>
        {status === 'done' ? `Выполнен` : `Готовится`}
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
            {new Date(createdAt).toLocaleString()}
          </p>
        )}
        {activeOrderData && (
          <p className={`${styles.totalCost} text text_type_digits-default ml-2`}>
            {orderIngredientsData && getTotalCost(orderIngredientsData as IIngredientData[], 1)}
            <CurrencyIcon type="primary" />
          </p>
        )}
      </div>
    </main>
  );
};

export default FeedOrderItemDetails;
