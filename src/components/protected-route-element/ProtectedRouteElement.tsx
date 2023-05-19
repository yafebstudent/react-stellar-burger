import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../services/store';
import { TProtectedRouteProps } from '../../utils/types';

const ProtectedRouteElement: FC<TProtectedRouteProps> = (props) => {
  const { anonymous, outlet } = props;
  const userData = useSelector((state: RootState) => state.userDataReducer.userData);
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
