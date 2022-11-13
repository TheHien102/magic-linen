import http from '../http';
import {
  AccountParams,
  LoginPrams,
  LoginAdminPrams,
  ResetPasswordParams,
  TokenResponse,
} from '../types';
import { API_URL } from './urls';

export const AccountApi = {
  loginAdmin: async function (data: LoginAdminPrams) {
    return await http.post(API_URL.adminLogin, data);
  },
  roleAdmin: async function (
    token: string | undefined
  ): Promise<TokenResponse> {
    return await http.get(`${API_URL.roleAdmin}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  createAdmin: async function (
    token: string | undefined,
    data: any
  ): Promise<any> {
    return await http.post(`${API_URL.createAdmin}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
