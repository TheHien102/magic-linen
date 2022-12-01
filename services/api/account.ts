import http from '../http';
import {
  LoginAdminPrams,
  PermissionPrams,
  PermissionRequest,
  RegisterPrams,
  TokenResponse,
} from '../types';
import { API_URL } from './urls';

export const AccountApi = {
  loginAdmin: async function (data: LoginAdminPrams) {
    return await http.post(API_URL.adminLogin, data);
  },
  logout: async function (token: string) {
    return await http.get(`${API_URL.logout}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  roleAdmin: async function (token: string) {
    return await http.get(`${API_URL.roleAdmin}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
  register: async function (data: RegisterPrams) {
    return await http.post(API_URL.register, data);
  },
  createPermission: async function (
    token: string,
    data: PermissionRequest
  ): Promise<any> {
    return await http.post(`${API_URL.createPermissions}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  permissionsList: async function (token: string) {
    return await http.get(`${API_URL.permissionsList}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
