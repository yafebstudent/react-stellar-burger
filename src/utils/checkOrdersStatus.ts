import { IIsOrderWithStatus } from './types';

const isOrderWithStatus: IIsOrderWithStatus = (allOrdersData, status) => {
  return allOrdersData.findIndex((orderData) => orderData.status === status) !== -1;
};

export default isOrderWithStatus;
