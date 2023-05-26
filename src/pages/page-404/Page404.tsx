import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Page404.module.css';
import alienImage from '../../images/alien.png';

const Page404: FC = () => {
  return (
    <main className={`${styles.page404}`}>
      <img className="mb-15" src={alienImage} alt="alien" />
      <p className="text text_type_main-medium mb-4">Похоже вы оказались в соседней галактике</p>
      <p className="text text_type_main-medium mb-4">Такой страницы не существует</p>
      <p className="text text_type_main-default text_color_inactive mb-4">
        {'Вернуться  на домашнюю страницу '}
        <Link className={styles.link} to="/login">
          Домой
        </Link>
      </p>
    </main>
  );
};

export default Page404;
