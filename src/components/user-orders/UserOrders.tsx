/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetUserOrdersDataQuery } from '../../services/websocketAPI';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import FeedOrdersItem from '../feed-orders-item/FeedOrdersItem';
import useModal from '../../hooks/useModal';
import styles from './UserOrders.module.css';
import FeedOrderItemDetails from '../feed-order-item-details/FeedOrderItemDetails';
import Modal from '../Modal/Modal';
import { useAppDispatch } from '../../hooks/hooks';
import { clearActiveOrderData } from '../../services/slices/activeOrderDataSlice';

const UserOrders: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  let content;
  const {
    data: userOrdersData,
    isError,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetUserOrdersDataQuery();

  const { isModalOpen, openModal, closeModal } = useModal();
  const modalCloseButtonClickHandler = () => {
    closeModal();
    dispatch(clearActiveOrderData());
    window.history.replaceState(null, '', location.pathname);
  };

  if (isError || (userOrdersData && !userOrdersData.success))
    content = <p className="text text_type_main-medium">An error has occurred with orders data!</p>;
  if (isLoading || isFetching) content = <LoadingSpinner />;
  if (isSuccess && userOrdersData && userOrdersData.success) {
    if (userOrdersData.orders.length > 0) {
      content = (
        <>
          {userOrdersData.orders.map((orderData, index) => (
            <FeedOrdersItem
              orderData={orderData}
              isOrderStatusDisplay
              key={index}
              openModal={openModal}
            />
          ))}
        </>
      );
    } else {
      content = <p className="text text_type_main-medium">У вас нет совершенных заказов</p>;
    }
  }

  return (
    <ul className={styles.list}>
      {content}
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} closeModal={modalCloseButtonClickHandler}>
          <FeedOrderItemDetails />
        </Modal>
      )}
    </ul>
  );
};

export default UserOrders;
