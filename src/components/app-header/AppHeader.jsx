import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import setLinkActiveStyle from '../../utils/setLinkActiveStyle';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul className={`${styles.navbarList} pt-4 pb-4`}>
          <li>
            <NavLink
              to="/"
              className={`${styles.navbarList__link} pt-4 pr-5 pb-4 pl-5`}
              style={setLinkActiveStyle}
            >
              <BurgerIcon type="secondary" />
              <span className="text text_type_main-default ml-2">Конструктор</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/orders"
              className={`${styles.navbarList__link} pt-4 pr-5 pb-4 pl-5`}
            >
              <ListIcon type="secondary" />
              <span className="text text_type_main-default ml-2">Лента заказов</span>
            </NavLink>
          </li>
          <li className={styles.logo}>
            <NavLink to="/" className={styles.logo__link}>
              <Logo />
            </NavLink>
          </li>
          <li className={styles.profile}>
            <NavLink
              to="/profile"
              className={`${styles.navbarList__link} pt-4 pr-5 pb-4 pl-5`}
              style={setLinkActiveStyle}
            >
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default ml-2">Личный кабинет</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
