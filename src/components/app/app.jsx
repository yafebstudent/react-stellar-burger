import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import data from '../../utils/data';
import getIngredientsData from '../../utils/api/getIngredientsData';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

const App = () => {
  const [ingredientsData, setIngredientsData] = useState(null);
  const [fetchError, setFetchError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cleanupFunction = false;

    setIsLoading(true);
    getIngredientsData()
      .then((responseData) => {
        if (!cleanupFunction) {
          setIsLoading(false);
          setIngredientsData(responseData.data);
          setFetchError('');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setIngredientsData(null);
        setFetchError(error.message);
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
