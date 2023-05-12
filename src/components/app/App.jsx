import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import { useGetIngredientsDataQuery } from '../../services/ingredientsDataAPI';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';

const App = () => {
  const { isError, isLoading, isFetching, isSuccess } = useGetIngredientsDataQuery();
  let content;

  if (isError) content = <h4>An error has occurred with ingredients data!</h4>;
  if (isLoading || isFetching) content = <LoadingSpinner />;
  if (isSuccess) {
    content = (
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main>
        <div className="outerWrapper">{content}</div>
      </main>
    </div>
  );
};

export default App;
