import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRouteElement = ({ children, anonymous = false }) => {
  const userData = useSelector((store) => store.userSliceReducer.userData);
  const location = useLocation();
  const from = location.state?.from || '/';
  if (anonymous && userData) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !userData) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRouteElement;
