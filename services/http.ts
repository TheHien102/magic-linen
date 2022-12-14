import Axios, { AxiosResponse } from 'axios';

const http = Axios.create({
  withCredentials: true,
});

http.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  error => {
    return Promise.reject({
      statusCode: error.response.status,
      errors: error.response.data,
    });
  }
);

export default http;
