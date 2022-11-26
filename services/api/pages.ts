import http from '../http';
// import { HomePageResponse } from '../types';
import { API_URL } from './urls';

export const PagesApi = {
  // home: async function (): Promise<HomePageResponse> {
  //   return await http.get(API_URL.home);
  // },

  listAdmin: async function (token: string, id: number) {
    return await http.get(
      `${API_URL.listAdmin}?kind=1&groupId=5&status=1&page=0&size=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  },
};
