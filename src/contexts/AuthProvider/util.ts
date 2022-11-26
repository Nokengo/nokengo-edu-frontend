import { api } from "../../services/api";
import { IUser } from "./types";

export const setUserLocalStorage = (user: IUser | null) => {
  localStorage.setItem('u', JSON.stringify(user))
}

export const getUserLocalStorage = () => {
  const user = localStorage.getItem('u')
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