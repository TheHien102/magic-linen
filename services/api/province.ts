import http from '../http';
import { API_URL } from './urls';

export const ProvinceApi = {
  listProvince: async function () {
    return await http.get(`${API_URL.provinceList}`);
  },
};
