import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { TProtectedRouteProps } from '../../utils/types';
import getCookie from '../../utils/getCookie';

const ProtectedRouteElement: FC<TProtectedRouteProps> = (props) => {
  const { anonymous, outlet } = props;
  const isAuthUser = !!getCookie('accessToken');
  const location = useLocation();
  const from = location.state?.from || '/';

  if (anonymous && isAuthUser) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isAuthUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return outlet;
};

export default ProtectedRouteElement;
