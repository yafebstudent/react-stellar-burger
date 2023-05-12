/* eslint-disable no-console */
import React, { useState } from 'react';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './ForgotPasswordPage.module.css';
import { useGetResetEmailMutation } from '../../services/stellarBurgersAPI';

const ForgotPasswordPage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [getResetEmail] = useGetResetEmailMutation();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!emailValue) {
      return;
    }
    getResetEmail({
      email: emailValue,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main className={`${styles.forgotPassword}`}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
        <EmailInput
          onChange={(event) => setEmailValue(event.target.value)}
          value={emailValue}
          name="email"
          placeholder="Укажите e-mail"
          isIcon={false}
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        {'Вспомнили пароль? '}
        <Link className={styles.link} to="/login">
          Сохранить
        </Link>
      </p>
    </main>
  );
};

export default ForgotPasswordPage;
