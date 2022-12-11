import http from '../http';
import {
  LoginAdminPrams,
  PermissionPrams,
  PermissionRequest,
  RegisterPrams,
  SetNewPassword,
  TokenResponse,
  UpdateProfileUserPrams,
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
  createAdmin: async function (token: string, data: any): Promise<any> {
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
      params: {
        page: 0,
        size: 999,
        sort: '',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateProfileUser: async function (
    data: UpdateProfileUserPrams,
    token: string
  ) {
    return await http.put(API_URL.updateProfileUser, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  requestForgetPassword: async function (_email: string) {
    return await http.post(`${API_URL.requestForgetPassword}`, {
      email: _email,
    });
  },
  setNewPassword: async function (data: SetNewPassword) {
    return await http.post(`${API_URL.setNewPassword}`, data);
  },
  profile: async function (token: string) {
    return await http.get(`${API_URL.profile}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
