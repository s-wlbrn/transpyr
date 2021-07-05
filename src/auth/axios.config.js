import axios from 'axios';
import AppError from '../libs/AppError';

const myAxios = (token = null) => {
  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.withCredentials = true;
    return config;
  });

  axiosInstance.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error) {
      return error.response
        ? Promise.reject(
            new AppError(
              error.response.data.message,
              error.response.data.statusCode
            )
          )
        : Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default myAxios;
