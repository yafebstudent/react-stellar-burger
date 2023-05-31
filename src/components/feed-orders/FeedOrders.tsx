import { FC } from 'react';
import { IOrderData } from '../../utils/types';
import FeedOrdersItem from '../feed-orders-item/FeedOrdersItem';
import { useGetAllOrdersDataQuery } from '../../services/websocketAPI';
import styles from './FeedOrders.module.css';

const FeedOrders: FC = () => {
  const { data: allOrdersData } = useGetAllOrdersDataQuery();

  return (
    <section className={styles.feedOrders}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
      {allOrdersData && allOrdersData.success && allOrdersData.orders.length > 0 && (
        <ul className={`${styles.feedOrders__list} mt-10 pt-6 pb-10 pr-4 pl-4`}>
          {allOrdersData?.orders?.map((orderData: IOrderData) => (
            <FeedOrdersItem
              isOrderStatusDisplay={false}
              key={orderData._id}
              orderData={orderData}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default FeedOrders;
