import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import getIngredientsData from '../../utils/api/getIngredientsData';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

const App = () => {
  const [ingredientsData, setIngredientsData] = useState(null);

  useEffect(() => {
    let cleanupFunction = false;

    getIngredientsData()
      .then((responseData) => {
        if (!cleanupFunction) {
          setIngredientsData(responseData.data);
        }
      })
      .catch((error) => {
        setIngredientsData(null);
        // eslint-disable-next-line no-console
        console.log(error.message);
      });

    // eslint-disable-next-line no-return-assign
    return () => (cleanupFunction = true);
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <div className="outerWrapper">
        {ingredientsData && <BurgerIngredients ingredientsData={ingredientsData} />}
        {ingredientsData && <BurgerConstructor ingredientsData={ingredientsData} />}
      </div>
    </div>
  );
};

export default App;
