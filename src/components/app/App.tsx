import React, { FC } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import Layout from '../Layout';
import LoginPage from '../../pages/login-page/LoginPage';
import RegisterPage from '../../pages/register-page/RegisterPage';
import ResetPasswordPage from '../../pages/reset-password-page/ResetPasswordPage';
import ForgotPasswordPage from '../../pages/forgot-password-page/ForgotPasswordPage';
import Page404 from '../../pages/page-404/Page404';
import Profile from '../../pages/profile-page/Profile';
import ProtectedRouteElement from '../protected-route-element/ProtectedRouteElement';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import Modal from '../Modal/Modal';
import { clearActiveIngredientData } from '../../services/slices/activeIngredientDataSlice';
import useModal from '../../hooks/useModal';
import { useAppDispatch } from '../../hooks/hooks';
import FeedPage from '../../pages/feed-page/FeedPage';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  const { isModalOpen, closeModal } = useModal();
  const modalCloseButtonClickHandler = () => {
    closeModal();
    dispatch(clearActiveIngredientData());
  };

  return (
    <Routes location={background || location}>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/profile"
          element={<ProtectedRouteElement outlet={<Profile />} anonymous={false} />}
        >
          <Route path="/profile/orders" element={<main>{null}</main>} />
        </Route>
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
      {background && (
        <Route
          path="/ingredients/:id"
          element={
            <Modal isModalOpen={isModalOpen} closeModal={modalCloseButtonClickHandler}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
    </Routes>
  );
};

export default App;
