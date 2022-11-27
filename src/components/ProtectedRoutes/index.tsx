import React from 'react';

import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthProvider/useAuth';

const verifyAuth = () => {
  // const user = localStorage.getItem('token')
  const { token } = useAuth();

  if (token) {
    return true
  } else {
    return false
  }
}

const ProtectedRoutes = (props: any) => {
  const auth = verifyAuth()

  return auth ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes;