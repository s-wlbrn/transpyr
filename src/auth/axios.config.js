import axios from 'axios';

const myAxios = (token = null) => {
  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use((config) => {
    if (token) {
      console.log(token);
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.withCredentials = true;
    return config;
  });

  axios.interceptors.response.use(function (response) {
    return response.data;
  });

  return axiosInstance;
};

export default myAxios;
