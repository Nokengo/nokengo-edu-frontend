import React from "react";
import { useAuth } from "../../contexts/AuthProvider/useAuth"

export const ProtectedLayout = ({children}: {children: JSX.Element}) => {
  const auth = useAuth();

  if(!auth.token){
    return <div>Not logged in</div>
  }

  return children;
}