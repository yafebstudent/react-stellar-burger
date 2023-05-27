/* eslint-disable no-console */
import React, { useCallback, FC } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import setLinkActiveStyle from '../../utils/setLinkActiveStyle';
import { useLogOutMutation } from '../../services/stellarBurgersAPI';
import { clearUserData } from '../../services/slices/userDataSlice';
import { useAppDispatch } from '../../hooks/hooks';
import removeCookie from '../../utils/removeCookie';

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logOut] = useLogOutMutation();
  const logOutHandler = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      logOut()
        .then((data) => {
          if ('data' in data) {
            console.log(data.data.message);
          }
          removeCookie('refreshToken');
          removeCookie('accessToken');
          dispatch(clearUserData());
          navigate('/login', { replace: true });
        })
        .catch((error) => console.error(error));
    },
    [dispatch, logOut, navigate]
  );

  return (
    <main className={styles.main}>
      <nav className={`${styles.navigation} mr-15`}>
        <ul className={`${styles.navigation__list} mb-20`}>
          <li className={styles.navigationListItem}>
            <NavLink
              className="text text_type_main-medium"
              style={setLinkActiveStyle}
              to="/profile"
            >
              Профиль
            </NavLink>
          </li>
          <li className={styles.navigationListItem}>
            <NavLink
              className="text text_type_main-medium"
              style={setLinkActiveStyle}
              to="/profile/orders"
            >
              История заказов
            </NavLink>
          </li>
          <li className={styles.navigationListItem}>
            <NavLink
              onClick={(event) => logOutHandler(event)}
              className="text text_type_main-medium"
              style={setLinkActiveStyle}
              to="/login"
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Outlet />
    </main>
  );
};

export default ProfilePage;
