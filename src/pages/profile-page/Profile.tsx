/* eslint-disable no-console */
import React, { useCallback, useEffect, useState, FC } from 'react';
import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Profile.module.css';
import setLinkActiveStyle from '../../utils/setLinkActiveStyle';
import {
  useGetUserDataQuery,
  useLogOutMutation,
  useUpdateUserDataMutation,
} from '../../services/stellarBurgersAPI';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';
import { clearUserData } from '../../services/userDataSlice';

const Profile: FC = () => {
  let content;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: userDataResponseData,
    isLoading,
    isSuccess,
    isFetching,
    isError,
    refetch,
  } = useGetUserDataQuery(localStorage.getItem('accessToken') || '');
  const [updateUserData] = useUpdateUserDataMutation();
  const [logOut] = useLogOutMutation();
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isButtonsHidden, setIsButtonHidden] = useState(true);
  const nameChangeHandler = (value: string) => {
    setNameValue(value);
    if (value && value !== userDataResponseData?.user.name) {
      setIsButtonHidden(false);
    } else {
      setIsButtonHidden(true);
    }
  };
  const emailChangeHandler = (value: string) => {
    setEmailValue(value);
    if (value && value !== userDataResponseData?.user.email) {
      setIsButtonHidden(false);
    } else {
      setIsButtonHidden(true);
    }
  };
  const passwordChangeHandler = (value: string) => {
    setPasswordValue(value);
    if (value && value.length >= 6) {
      setIsButtonHidden(false);
    } else {
      setIsButtonHidden(true);
    }
  };
  const cancelHandler = () => {
    setNameValue(userDataResponseData?.user.name);
    setEmailValue(String(userDataResponseData?.user.email));
    setIsButtonHidden(true);
  };
  const saveInputsValues = () => {
    const newUserProfileData = {
      ...(nameValue !== userDataResponseData?.user.name && { name: nameValue }),
      ...(emailValue !== userDataResponseData?.user.email && { email: emailValue }),
      ...(passwordValue && { password: passwordValue }),
    };

    updateUserData(newUserProfileData)
      .then((data) => {
        console.log(data);
        setIsButtonHidden(true);
        setPasswordValue('');
        refetch();
      })
      .catch((error) => console.error(error));
  };
  const logOutHandler = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      logOut()
        .then((data) => {
          if ('data' in data) {
            console.log(data.data.message);
          }
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');
          dispatch(clearUserData());
          navigate('/login', { replace: true });
        })
        .catch((error) => console.error(error));
    },
    [dispatch, logOut, navigate]
  );

  useEffect(() => {
    if (isSuccess) {
      setNameValue(userDataResponseData?.user.name);
      setEmailValue(String(userDataResponseData?.user.email));
    }
  }, [isSuccess, userDataResponseData]);

  if (isError)
    content = <p className="text text_type_main-medium">An error has occurred with user data!</p>;
  if (isLoading || isFetching) content = <LoadingSpinner />;
  if (isSuccess) {
    content = (
      <>
        <li>
          <Input
            type="text"
            placeholder="Имя"
            onChange={(event) => nameChangeHandler(event.target.value)}
            icon="EditIcon"
            value={nameValue}
            name="name"
            error={false}
            errorText="Ошибка"
            size="default"
            extraClass="mb-6"
          />
        </li>
        <li>
          <EmailInput
            onChange={(event) => emailChangeHandler(event.target.value)}
            value={emailValue}
            name="email"
            placeholder="Логин"
            isIcon
            extraClass="mb-6"
          />
        </li>
        <li>
          <PasswordInput
            placeholder="Пароль"
            onChange={(event) => passwordChangeHandler(event.target.value)}
            value={passwordValue}
            name="password"
            extraClass="mb-6"
            icon="EditIcon"
          />
        </li>
        <li className={styles.buttons}>
          {!isButtonsHidden && (
            <>
              <Button onClick={cancelHandler} htmlType="button" type="secondary" size="medium">
                Отмена
              </Button>
              <Button
                onClick={saveInputsValues}
                htmlType="submit"
                type="primary"
                size="medium"
                extraClass="mb-20"
              >
                Сохранить
              </Button>
            </>
          )}
        </li>
      </>
    );
  }

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
      <ul className={styles.userDataList}>{content}</ul>
    </main>
  );
};

export default Profile;
