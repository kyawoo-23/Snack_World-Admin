import {
  DELIVERY_ORDER_STATUS,
  DELIVERY_STATUS,
  LOCAL_STORAGES,
  ROLES,
} from '@utils/constants';
import { format } from 'date-fns';

export const setLocalStorage = (key: LOCAL_STORAGES, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key: LOCAL_STORAGES) => {
  return localStorage.getItem(key);
};

export const removeLocalStorageItem = (key: string) => {
  if (localStorage) {
    localStorage.removeItem(key);
  }
};

export const getUserRole = (): ROLES | undefined => {
  return JSON.parse(getLocalStorage(LOCAL_STORAGES.USER_DATA) || '{}')?.role;
};

export const convertToDateTime = (date: string | Date) => {
  return format(date, 'PPpp');
};

export const getDeliveryStatusColor = (status: DELIVERY_STATUS) => {
  switch (status) {
    case DELIVERY_STATUS.PENDING:
      return '#1890ff';
    case DELIVERY_STATUS.DELIVERING:
      return '#ffa500';
    case DELIVERY_STATUS.DELIVERED:
      return '#28a745';
    default:
      return '#ffffff';
  }
};

export const getDeliveryOrderStatusColor = (status: DELIVERY_ORDER_STATUS) => {
  switch (status) {
    case DELIVERY_ORDER_STATUS.NEW:
      return '#1890ff';
    case DELIVERY_ORDER_STATUS.DELIVERING:
      return '#ffa500';
    case DELIVERY_ORDER_STATUS.DELIVERED:
      return '#28a745';
    default:
      return '#ffffff';
  }
};
