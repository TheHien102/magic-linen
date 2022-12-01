import Axios, { AxiosResponse } from 'axios';
const baseURL = 'https://linen-a-be.herokuapp.com/v1/';

const http = Axios.create({
  baseURL,
  withCredentials: true,
});

http.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    return Promise.reject({
      statusCode: error.response.status,
      errors: error.response.data,
    });
  }
);

export default http;
