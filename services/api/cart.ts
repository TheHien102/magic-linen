import http from '../http';
import { AddToCartParams } from '../types';
import { API_URL } from './urls';

export const CartApi = {
  addToCart: async function (token: string, data: AddToCartParams) {
    return await http.post(`${API_URL.addToCart}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
