import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { IOrderData } from '../../utils/types';
import FeedOrdersItem from '../feed-orders-item/FeedOrdersItem';
import { useGetAllOrdersDataQuery } from '../../services/websocketAPI';
import styles from './FeedOrders.module.css';
import useModal from '../../hooks/useModal';
import Modal from '../Modal/Modal';
import FeedOrderItemDetails from '../feed-order-item-details/FeedOrderItemDetails';
import { clearActiveOrderData } from '../../services/slices/activeOrderDataSlice';
import { useAppDispatch } from '../../hooks/hooks';

const FeedOrders: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { data: allOrdersData } = useGetAllOrdersDataQuery();
  const { isModalOpen, openModal, closeModal } = useModal();
  const modalCloseButtonClickHandler = () => {
    closeModal();
    dispatch(clearActiveOrderData());
    window.history.replaceState(null, '', location.pathname);
  };

  return (
    <section className={styles.feedOrders}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
      {allOrdersData?.orders[0] && (
        <ul className={`${styles.feedOrders__list} mt-10 pt-6 pb-10 pr-4 pl-4`}>
          {allOrdersData?.orders?.map((orderData: IOrderData) => (
            <FeedOrdersItem
              isOrderStatusDisplay={false}
              key={orderData._id}
              orderData={orderData}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} closeModal={modalCloseButtonClickHandler}>
          <FeedOrderItemDetails />
        </Modal>
      )}
    </section>
  );
};

export default FeedOrders;
