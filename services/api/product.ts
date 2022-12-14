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
  updateProduct: async function (
    token: string | undefined,
    data: AddProductPrams
  ) {
    return await http.put(API_URL.updateProduct, data, {
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
  listProductPerPage: async function (token: string) {
    return await http.get(`${API_URL.adminListProduct}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getProductById: async function (id: string) {
    return await http.get(`${API_URL.getProductById}/${id}`);
  },
  listProductUser: async function (size: number) {
    return await http.get(API_URL.userListProduct, {
      params: {
        page: 0,
        size: size,
        sort: [],
      },
    });
  },
};
