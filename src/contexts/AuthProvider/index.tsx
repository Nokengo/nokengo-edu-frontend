import React, { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IAuthProvider, IContext, IUser, LoginReqDto } from "./types";
import { decodeToken, loginRequest, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const data = localStorage.getItem("token");

  if (data !== null && user === null) {
    setUser(JSON.parse(data));
  }

  async function authenticate({ email, password }: LoginReqDto) {
    const response = await loginRequest(email, password)
    const { role, sub } = decodeToken(response.access_token);

    const payload = {
      token: response.access_token,
      email: email,
      role: role,
      id: sub,
    }

    setUser(payload);
    setUserLocalStorage(payload);
  }

  const logout = () => {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
