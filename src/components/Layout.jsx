import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import AppHeader from './app-header/AppHeader';

const Layout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};

export default Layout;
