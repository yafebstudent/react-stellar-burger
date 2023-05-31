import { TIsOrderWithStatus } from './types';

const isOrderWithStatus: TIsOrderWithStatus = (allOrdersData, status) => {
  return allOrdersData.findIndex((orderData) => orderData.status === status) !== -1;
};

export default isOrderWithStatus;
