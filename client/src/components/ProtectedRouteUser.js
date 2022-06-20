import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRouteUser = () => {
  const { isAuth, userInfo } = useSelector((state) => state.user);
  return isAuth && (userInfo.role === 'admin' || userInfo.role === 'user') ? (
    <Outlet />
  ) : (
    <Navigate to='/login' />
  );
};

export default ProtectedRouteUser;
