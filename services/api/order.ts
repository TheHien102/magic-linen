import http from '../http';
import { OrderListParams } from '../types';
import { API_URL } from './urls';

export const OrderApi = {
  orderList: async function (token: string, params?: OrderListParams) {
    return await http.get(`${API_URL.orderList}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });
  },
};
