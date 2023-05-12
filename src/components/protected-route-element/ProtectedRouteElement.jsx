import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGetUserDataQuery } from '../../services/stellarBurgersAPI';

const ProtectedRouteElement = (props) => {
  const { element } = props;
  const { isSuccess, isError } = useGetUserDataQuery(localStorage.getItem('accessToken') || '');

  if (!isSuccess && !isError) {
    return null;
  }

  return !isError ? element : <Navigate to="/login" replace />;
};

export default ProtectedRouteElement;
