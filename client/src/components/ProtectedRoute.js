import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRouteAdmin = () => {
  const { isAuth, userInfo } = useSelector((state) => state.user);
  return isAuth && userInfo.role === 'admin' ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRouteAdmin;
