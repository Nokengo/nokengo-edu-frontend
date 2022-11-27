import axios from 'axios';
import { getUserLocalStorage } from '../contexts/AuthProvider/util';

export const api = axios.create({
  baseURL: 'https://backedu.nokengo.com/api',
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