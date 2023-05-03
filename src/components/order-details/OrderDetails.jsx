import React from 'react';
import styles from './OrderDetails.module.css';
import checkoutDoneImage from '../../images/checkout-done.gif';

const OrderDetails = (props) => {
  const { oderId } = props;

  return (
    <div className={styles.orderDetails}>
      <p className={`${styles.orderDetails__title} text text_type_digits-large mt-30 mb-8`}>
        {oderId}
      </p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img className="mb-15" src={checkoutDoneImage} alt="jackdaw" />
      <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
