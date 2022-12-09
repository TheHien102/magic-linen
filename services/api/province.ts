import http from '../http';
import { AddAllProvinceParams } from '../types';
import { API_URL } from './urls';

export const ProvinceApi = {
  listProvince: async function (_name: string, _level: number) {
    return await http.get(`${API_URL.provinceList}`, {
      params: {
        name: _name,
        level: _level,
        specification: {},
      },
    });
  },
  getChildProvince: async function (_id: number) {
    return await http.get(`${API_URL.provinceGetChild}`, {
      params: {
        id: _id,
      },
    });
  },
  createProvince: async function (token: string, data: AddAllProvinceParams) {
    return await http.post(`${API_URL.provinceCreateAll}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
