import { LOCAL_STORAGES } from '@utils/constants';
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

export const convertToDateTime = (date: string | Date) => {
  return format(date, 'PPpp');
};
