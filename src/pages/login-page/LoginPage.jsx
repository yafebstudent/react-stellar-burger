/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './LoginPage.module.css';
import { useAuthUserMutation } from '../../services/stellarBurgersAPI';

const LoginPage = () => {
  const userData = useSelector((state) => state.userDataReducer.userData);
  const location = useLocation();
  const navigate = useNavigate();
  const [authUser] = useAuthUserMutation();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!emailValue || !passwordValue) {
      return;
    }
    authUser({
      email: emailValue,
      password: passwordValue,
    })
      .then((data) => {
        const { data: responseData } = data;
        let accessToken;
        let refreshToken;

        if ('accessToken' in responseData) {
          [, accessToken] = responseData.accessToken.split('Bearer ');
          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
          }
        }
        if ('refreshToken' in responseData) {
          refreshToken = responseData.refreshToken;
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
          }
        }
        navigate(`${location.state?.from.pathname || '/'}`, { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (userData) {
    return <Navigate to={`${location.state?.from.pathname || '/'}`} />;
  }

  return (
    <main className={`${styles.login}`}>
      <form onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        <EmailInput
          onChange={(event) => setEmailValue(event.target.value)}
          value={emailValue}
          name="email"
          placeholder="E-mail"
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={(event) => setPasswordValue(event.target.value)}
          value={passwordValue}
          name="password"
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        {'Вы — новый пользователь? '}
        <Link className={styles.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        {'Забыли пароль? '}
        <Link className={styles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
