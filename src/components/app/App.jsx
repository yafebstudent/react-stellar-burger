import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import Layout from '../Layout';
import LoginPage from '../../pages/login-page/LoginPage';
import RegisterPage from '../../pages/register-page/RegisterPage';
import ResetPasswordPage from '../../pages/reset-password-page/ResetPasswordPage';
import ForgotPasswordPage from '../../pages/forgot-password-page/ForgotPasswordPage';
import Page404 from '../../pages/page-404/Page404';
import Profile from '../../pages/profile-page/Profile';
import ProtectedRouteElement from '../protected-route-element/ProtectedRouteElement';
import IngredientPage from '../../pages/ingredient-page/IngredientPage';
import IngredientDetails from '../ingredient-details/IngredientDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/profile" element={<ProtectedRouteElement element={<Profile />} />}>
            <Route path="/profile/orders" element={<main>{null}</main>} />
          </Route>
          <Route path="/ingredients" element={<IngredientPage />}>
            <Route path=":id" element={<IngredientDetails />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
