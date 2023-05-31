/* eslint-disable react/no-array-index-key */
import { FC, useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { IFeedOrdersItemProps, IIngredientData } from '../../utils/types';
import styles from './FeedOrdersItem.module.css';
import { useGetIngredientsDataQuery } from '../../services/stellarBurgersAPI';
import getTotalCost from '../../utils/getTotalCost';
import getOrderIngredientsData from '../../utils/getOrderIngredientsData';
import { useAppDispatch } from '../../hooks/hooks';
import { setActiveOrderData } from '../../services/slices/activeOrderDataSlice';

const FeedOrdersItem: FC<IFeedOrdersItemProps> = (props) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { orderData, isOrderStatusDisplay } = props;
  const { status, number: orderNumber, createdAt, name, ingredients: ingredientsID } = orderData;
  const { data: ingredientsResponseData, isSuccess } = useGetIngredientsDataQuery();
  const orderIngredientsData = useMemo(() => {
    if (isSuccess && ingredientsID && ingredientsResponseData.success) {
      return getOrderIngredientsData(ingredientsID, ingredientsResponseData.data);
    }
    return null;
  }, [isSuccess, ingredientsID, ingredientsResponseData]);

  const orderItemClickHandler = () => {
    dispatch(setActiveOrderData(orderData));
  };

  return (
    <li
      onClick={orderItemClickHandler}
      onKeyDown={orderItemClickHandler}
      role="menuitem"
      tabIndex={0}
    >
      <Link
        className={styles.ordersItem}
        to={`${location.pathname}/${orderNumber}`}
        state={{ background: location }}
      >
        <div className={styles.headingLine}>
          <p className="text text_type_digits-default">{`#${orderNumber}`}</p>
          <p className="text text_type_main-default text_color_inactive">
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
        <p className="text text_type_main-default">{name}</p>
        {isOrderStatusDisplay && (
          <p className="text text_type_main-default">{status === 'done' ? 'Создан' : ''}</p>
        )}
        <div className={styles.footer}>
          <ul className={styles.ingredientsList}>
            {orderIngredientsData &&
              orderIngredientsData.length > 0 &&
              (orderIngredientsData as IIngredientData[]).map((ingredientData, index, array) => {
                if (index < 5) {
                  return (
                    <li
                      className={styles.ingredientsList__item}
                      key={index}
                      style={{ zIndex: 6 - index }}
                    >
                      <img
                        className={styles.ingredientImage}
                        src={ingredientData?.image}
                        alt={ingredientData?.name}
                      />
                    </li>
                  );
                }
                if (index === 5 && array.length > 6) {
                  return (
                    <li
                      className={`${styles.ingredientsList__item}`}
                      key={index}
                      style={{ zIndex: 6 - index }}
                    >
                      <img
                        className={styles.ingredientImage}
                        src={ingredientData?.image}
                        alt={ingredientData?.name}
                      />
                      <p
                        className={`${styles.remainIngredientsCount} text text_type_digits-default`}
                      >
                        +{array.length - 1 - index}
                      </p>
                    </li>
                  );
                }
                return null;
              })}
          </ul>
          <div className={styles.totalCost}>
            <span className="text text_type_digits-default">
              {orderIngredientsData &&
                orderIngredientsData.length > 0 &&
                getTotalCost(orderIngredientsData, 1)}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default FeedOrdersItem;
