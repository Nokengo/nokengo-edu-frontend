import axios from 'axios';
import { getUserLocalStorage } from '../contexts/AuthProvider/util';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();

    if (config.headers){
      config.headers.Authorization = user?.token ? `Bearer ${user.token}` : '';
    }
    
    return config;
  }, 
  (error) => {
    return Promise.reject(error);
  }
  );