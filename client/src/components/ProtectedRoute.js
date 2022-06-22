import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRouteAdmin = () => {
  const { isAuth, userInfo } = useSelector((state) => state.user);
  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRouteAdmin;
