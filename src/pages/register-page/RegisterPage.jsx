/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';
import { useGetUserDataQuery, useRegisterUserMutation } from '../../services/stellarBurgersAPI';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [registerUser] = useRegisterUserMutation();
  const { isSuccess } = useGetUserDataQuery(localStorage.getItem('accessToken') || '');
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!emailValue || !passwordValue || !nameValue) {
      return;
    }
    registerUser({
      email: emailValue,
      password: passwordValue,
      name: nameValue,
    })
      .then((data) => {
        console.log(data);
        navigate('/', { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (isSuccess) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className={`${styles.register}`}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <Input
          type="text"
          placeholder="Имя"
          onChange={(event) => setNameValue(event.target.value)}
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
        />
        <PasswordInput
          onChange={(event) => setPasswordValue(event.target.value)}
          value={passwordValue}
          name="password"
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        {'Уже зарегистрированы? '}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </main>
  );
};

export default RegisterPage;
