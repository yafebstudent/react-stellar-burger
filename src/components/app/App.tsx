import React, { FC } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import Layout from '../Layout';
import LoginPage from '../../pages/login-page/LoginPage';
import RegisterPage from '../../pages/register-page/RegisterPage';
import ResetPasswordPage from '../../pages/reset-password-page/ResetPasswordPage';
import ForgotPasswordPage from '../../pages/forgot-password-page/ForgotPasswordPage';
import Page404 from '../../pages/page-404/Page404';
import ProfilePage from '../../pages/profile-page/ProfilePage';
import ProtectedRouteElement from '../protected-route-element/ProtectedRouteElement';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import Modal from '../Modal/Modal';
import { clearActiveIngredientData } from '../../services/slices/activeIngredientDataSlice';
import useModal from '../../hooks/useModal';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import FeedPage from '../../pages/feed-page/FeedPage';
import FeedOrderItemDetails from '../feed-order-item-details/FeedOrderItemDetails';
import UserOrders from '../user-orders/UserOrders';
import Profile from '../profile/Profile';
import { clearOrderDetailsData } from '../../services/slices/orderDetailsDataSlice';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const { isModalOpen, openModal, closeModal } = useModal();
  const handleIngredientModalClose = () => {
    closeModal();
    navigate(-1);
    dispatch(clearActiveIngredientData());
  };
  const handleOrderModalClose = () => {
    closeModal();
    navigate(-1);
    dispatch(clearOrderDetailsData());
  };
  useAppSelector((state) => console.log(state));

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/profile"
            element={<ProtectedRouteElement outlet={<ProfilePage />} anonymous={false} />}
          >
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/orders" element={<UserOrders />} />
          </Route>
          <Route path="/profile/orders/:id" element={<FeedOrderItemDetails />} />
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:id" element={<FeedOrderItemDetails />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal
                isModalOpen={isModalOpen}
                openModal={openModal}
                closeModal={handleIngredientModalClose}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="feed/:id"
            element={
              <Modal
                isModalOpen={isModalOpen}
                openModal={openModal}
                closeModal={handleOrderModalClose}
              >
                <FeedOrderItemDetails />
              </Modal>
            }
          />
          <Route
            path="profile/orders/:id"
            element={
              <Modal
                isModalOpen={isModalOpen}
                openModal={openModal}
                closeModal={handleOrderModalClose}
              >
                <FeedOrderItemDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
