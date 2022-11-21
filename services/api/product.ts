import http from '../http';
import { AddProductPrams } from '../types';
import { API_URL } from './urls';

export const ProductApi = {
  addProduct: async function (
    token: string | undefined,
    data: AddProductPrams
  ) {
    return await http.post(API_URL.addProduct, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  },
  categoryList: async function (token: string | undefined) {
    return await http.get(API_URL.categoryList, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  listProductPerPage: async function (id: number, token: string) {
    return await http.get(`${API_URL.adminProduct}/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        page: 1,
        size: 1,
        sort: ['string'],
      },
    });
  },
  getProductById: async function (id: string, token: string) {
    return await http.get(`${API_URL.getProductById}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
