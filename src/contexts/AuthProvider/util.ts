import { api } from "../../services/api";
import { IUser } from "./types";

export const setUserLocalStorage = (user: IUser | null) => {
  if(user=== null){
    localStorage.removeItem('user');
  } else {
    localStorage.setItem('token', JSON.stringify(user))
  }
}

export const getUserLocalStorage = () => {
  const user = localStorage.getItem('token')
  return user ? JSON.parse(user) : null
}

export const loginRequest = async (email: string, password: string) => {
  try{
    const request = await api.post('/auth/login', {
      email,
      password,
    });

    return request.data;
  } catch (err) {
    return null;
  }
}

export const decodeToken = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}