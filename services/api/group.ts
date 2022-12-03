import http from '../http';
import { GroupCreateRequest, GroupUpdateRequest } from '../types';
// import { HomePageResponse } from '../types';
import { API_URL } from './urls';

export const GroupApi = {
  listGroupById: async function (token: string, id: number) {
    return await http.get(`${API_URL.listGroupById}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateGroupById: async function (token: string, data: GroupUpdateRequest) {
    return await http.put(`${API_URL.updateGroupById}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  listAllGroup: async function (token: string) {
    return await http.get(`${API_URL.listAllGroup}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createGroup: async function (
    token: string,
    data: GroupCreateRequest
  ): Promise<any> {
    return await http.post(`${API_URL.createGroup}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
