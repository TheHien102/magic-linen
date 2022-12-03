import http from '../http';
// import { HomePageResponse } from '../types';
import { API_URL } from './urls';

export const PagesApi = {
  // home: async function (): Promise<HomePageResponse> {
  //   return await http.get(API_URL.home);
  // },

  listAdmin: async function (token: string) {
    return await http.get(`${API_URL.listAdmin}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
