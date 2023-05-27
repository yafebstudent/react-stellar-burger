import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './FeedPage.module.css';
import FeedInfo from '../../components/feed-info/FeedInfo';
import FeedOrders from '../../components/feed-orders/FeedOrders';
import { useGetAllOrdersDataQuery } from '../../services/websocketAPI';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';

const FeedPage: FC = () => {
  let content;
  const {
    data: allOrdersData,
    isError,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetAllOrdersDataQuery();

  if (isError) content = <h4>An error has occurred with orders data!</h4>;
  if (isLoading || isFetching) content = <LoadingSpinner />;
  if (isSuccess) {
    content = allOrdersData?.orders[0] && (
      <>
        <FeedOrders />
        <FeedInfo />
      </>
    );
  }

  return <main className={styles.feed}>{content}</main>;
};

export default FeedPage;
