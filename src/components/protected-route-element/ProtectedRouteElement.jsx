import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { ProtectedRouteElementPropType } from '../../utils/prop-types';

const ProtectedRouteElement = (props) => {
  const { element, anonymous = false } = props;
  const userData = useSelector((state) => state.userDataReducer.userData);
  const location = useLocation();
  const from = location.state?.from || '/';

  if (anonymous && userData) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !userData) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

ProtectedRouteElement.propTypes = ProtectedRouteElementPropType;

export default ProtectedRouteElement;
