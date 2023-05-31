/* eslint-disable react/no-array-index-key */
import { FC } from 'react';
import styles from './FeedInfo.module.css';
import { IOrderData } from '../../utils/types';
import { useGetAllOrdersDataQuery } from '../../services/websocketAPI';
import isOrderWithStatus from '../../utils/checkOrdersStatus';

const FeedInfo: FC = () => {
  const { data: allOrdersData } = useGetAllOrdersDataQuery();

  return (
    <section className={styles.feedInfo}>
      {allOrdersData && allOrdersData.orders.length > 0 && (
        <>
          <div className={styles.ordersNumbers}>
            {isOrderWithStatus(allOrdersData.orders, 'done') && (
              <div>
                <p className="text text_type_main-medium pb-6">Готовы:</p>
                <ul className={styles.orderNumbersList}>
                  {allOrdersData.orders?.map((order: IOrderData, index) => {
                    if (order.status === 'done') {
                      return (
                        <li className="text text_type_digits-default pb-2" key={index}>
                          {order.number}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}
            {isOrderWithStatus(allOrdersData.orders, 'pending') && (
              <div>
                <p className="text text_type_main-medium pb-6">В работе:</p>
                <ul>
                  {allOrdersData.orders?.map((order: IOrderData, index: number) => {
                    if (index < 10 && order.status === 'pending') {
                      return (
                        <li className="text text_type_digits-default pb-2" key={index}>
                          {order.number}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className="mb-15">
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <span className={`${styles.ordersCount} text text_type_digits-large`}>
              {allOrdersData.total}
            </span>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <span className={`${styles.ordersCount} text text_type_digits-large`}>
              {allOrdersData.totalToday}
            </span>
          </div>
        </>
      )}
    </section>
  );
};

export default FeedInfo;
