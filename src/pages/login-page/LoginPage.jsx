import React, { useState } from 'react';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <main className={`${styles.login}`}>
      <form>
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
