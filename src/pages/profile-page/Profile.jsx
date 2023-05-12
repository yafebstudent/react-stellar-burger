/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  Input,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import styles from './Profile.module.css';
import setLinkActiveStyle from '../../utils/setLinkActiveStyle';

const Profile = () => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

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
            <NavLink className="text text_type_main-medium" style={setLinkActiveStyle} to="/">
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <ul>
        <li>
          <Input
            type="text"
            placeholder="Имя"
            onChange={(event) => setNameValue(event.target.value)}
            icon="EditIcon"
            value={nameValue}
            name="name"
            error={false}
            errorText="Ошибка"
            size="default"
            extraClass="mb-6"
          />
          <EmailInput
            onChange={(event) => setEmailValue(event.target.value)}
            value={emailValue}
            name="email"
            placeholder="E-mail"
            isIcon={false}
            extraClass="mb-6"
            icon="EditIcon"
          />
          <PasswordInput
            onChange={(event) => setPasswordValue(event.target.value)}
            value={passwordValue}
            name="password"
            icon="EditIcon"
          />
        </li>
      </ul>
    </main>
  );
};

export default Profile;
