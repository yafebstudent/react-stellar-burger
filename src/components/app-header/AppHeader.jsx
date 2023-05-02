import React from 'react';
import styles from "./AppHeader.module.css";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul className={`${styles.navbarList} pt-4 pb-4`}>
          <li>
            <a href='/' className={`${styles.navbarList__link} p-5`}>
              <figure className="icon">
                <BurgerIcon type="secondary"/>
              </figure>
              <span className="text text_type_main-default ml-2">Конструктор</span>
            </a>
          </li>
          <li>
            <a href='/' className={`${styles.navbarList__link} p-5`}>
            <ListIcon type="secondary" />
              <span className="text text_type_main-default ml-2">Лента заказов</span>
            </a>
          </li>
          <li className={styles.logo}>
            <a href='/'>
              <Logo />
            </a>
          </li>
          <li className={styles.profile}>
            <a href='/' className={`${styles.navbarList__link} p-5`}>
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default ml-2">Личный кабинет</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;