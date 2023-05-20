import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { TProtectedRouteProps } from '../../utils/types';
import { useAppSelector } from '../../hooks/hooks';

const ProtectedRouteElement: FC<TProtectedRouteProps> = (props) => {
  const { anonymous, outlet } = props;
  const userData = useAppSelector((state) => state.userDataReducer.userData);
  const location = useLocation();
  const from = location.state?.from || '/';

  if (anonymous && userData) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !userData) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return outlet;
};

export default ProtectedRouteElement;
