/* eslint-disable no-console */
import React, { useState, FC } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import styles from './ResetPasswordPage.module.css';
import { useResetPasswordMutation } from '../../services/stellarBurgersAPI';

const ResetPasswordPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [passwordValue, setPasswordValue] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [resetPassword] = useResetPasswordMutation();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!passwordValue) {
      return;
    }
    resetPassword({
      password: passwordValue,
      token: codeValue,
    })
      .then((data) => {
        if ('data' in data && data.data.success === true) {
          navigate('/login', { replace: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (location.state?.from.pathname !== '/forgot-password') {
    return <Navigate to="/" replace />;
  }

  return (
    <main className={`${styles.resetPassword}`}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
        <PasswordInput
          onChange={(event) => setPasswordValue(event.target.value)}
          value={passwordValue}
          name="password"
          extraClass="mb-6"
          placeholder="Введите новый пароль"
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={(event) => setCodeValue(event.target.value)}
          value={codeValue}
          name="code"
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        {'Вспомнили пароль? '}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </main>
  );
};

export default ResetPasswordPage;
