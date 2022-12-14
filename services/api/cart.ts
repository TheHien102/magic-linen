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
  createOrderUser: async function (token: string, data: OrderGuestParam) {
    return await http.post(`${API_URL.createOrder}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteCart: async function (token: string, id: number) {
    return await http.delete(`${API_URL.deleteCart}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: id,
      },
    });
  },
};
