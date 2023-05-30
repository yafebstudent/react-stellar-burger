/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import { useGetUserOrdersDataQuery } from '../../services/websocketAPI';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import FeedOrdersItem from '../feed-orders-item/FeedOrdersItem';
import styles from './UserOrders.module.css';

const UserOrders: FC = () => {
  let content;
  const {
    data: userOrdersData,
    isError,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetUserOrdersDataQuery();

  if (isError || (userOrdersData && !userOrdersData.success))
    content = <p className="text text_type_main-medium">An error has occurred with orders data!</p>;
  if (isLoading || isFetching) content = <LoadingSpinner />;
  if (isSuccess && userOrdersData && userOrdersData.success) {
    if (userOrdersData.orders.length > 0) {
      content = (
        <>
          {userOrdersData.orders.map((orderData, index) => (
            <FeedOrdersItem orderData={orderData} isOrderStatusDisplay key={index} />
          ))}
        </>
      );
    } else {
      content = <p className="text text_type_main-medium">У вас нет совершенных заказов</p>;
    }
  }

  return <ul className={styles.list}>{content}</ul>;
};

export default UserOrders;
