import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './IngredientPage.module.css';

const IngredientPage = () => {
  return (
    <main className={`${styles.ingredientPage}`}>
      <Outlet />
    </main>
  );
};

export default IngredientPage;
