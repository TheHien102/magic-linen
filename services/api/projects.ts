import { serialize } from 'object-to-formdata'
import http from '../http'
import {
  CreateProjectParams,
  Project,
  ProjectCalibrate,
  ProjectCheckParams,
  ProjectDetails,
  ProjectListParams,
  ProjectsResponse,
} from '../types'
import { API_URL } from './urls'

export const ProjectApi = {
  list: async function (
    params: ProjectListParams,
    token: string
  ): Promise<ProjectsResponse> {
    return await http.get(`${API_URL.projects}all/`, {
      params: {
        ...params,
        per_page: 8,
      },
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
  },
  create: async function (
    data: CreateProjectParams,
    token: string
  ): Promise<{ project_pk: number }> {
    const formData = serialize(data)
    return await http.post(`${API_URL.projects}create/`, formData, {
      headers: {
        Authorization: `JWT ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  delete: async function (id: number, token: string) {
    return await http.post(`${API_URL.projects}delete/${id}/`, undefined, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
  },

  update: async function (id: number, data: ProjectCheckParams, token: string) {
    return await http.post(`${API_URL.projects}check/${id}/`, data, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
  },

  download: async function (id: number, token: string): Promise<Blob> {
    return await http.get(`${API_URL.projects}download/${id}/`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
  },
  details: async function (id: string, token: string): Promise<ProjectDetails> {
    return await http.get(`${API_URL.projects}check/${id}/`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
  },
  calibrate: async function (
    id: string,
    token: string
  ): Promise<ProjectCalibrate> {
    return await http.get(`${API_URL.projects}calibrate/${id}/`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
  },
}
