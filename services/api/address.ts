import http from '../http';
import { AddressCreateParams } from '../types';
import { API_URL } from './urls';

export const AddressApi = {
  listAddress: async function (token: string) {
    return await http.get(`${API_URL.addressList}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  AddNewAddress: async function (token: string, data: AddressCreateParams) {
    return await http.post(`${API_URL.addressCreate}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
