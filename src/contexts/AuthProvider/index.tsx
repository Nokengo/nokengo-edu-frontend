import React, {createContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { IAuthProvider, IContext, IUser, LoginReqDto } from "./types";
import { loginRequest, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = React.useState<IUser | null>(null);
  
  async function authenticate({ email, password }: LoginReqDto) {
    const response = await loginRequest(email, password)
    const payload = {token: response.access_token}

    setUser(payload);
    setUserLocalStorage(payload);
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  useEffect(() => {
    if(user===null){
      const user = localStorage.getItem("u");
      if (user) {
        setUser(JSON.parse(user));
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
