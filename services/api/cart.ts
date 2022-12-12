import http from '../http';
import { AddToCartParams, CartListParams, OrderGuestParam } from '../types';
import { API_URL } from './urls';

export const CartApi = {
  addToCart: async function (token: string, data: AddToCartParams) {
    return await http.post(`${API_URL.addToCart}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateCartItem: async function (
    token: string,
    data: { cartItemId: number; quantity: number }
  ) {
    return await http.put(`${API_URL.cartUpdateItem}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  listCart: async function (token: string) {
    return await http.get(`${API_URL.cartList}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createOrderGuest: async function (data: OrderGuestParam) {
    return await http.post(`${API_URL.createOrder}`, data);
  },
};
