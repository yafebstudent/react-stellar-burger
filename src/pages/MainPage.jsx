import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import LoadingSpinner from '../components/loading-spinner/LoadingSpinner';
import { useGetIngredientsDataQuery } from '../services/ingredientsDataAPI';
import BurgerIngredients from '../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../components/burger-constructor/BurgerConstructor';
import AppHeader from '../components/app-header/AppHeader';

const MainPage = () => {
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
    <div>
      <AppHeader />
      <main>
        <div className="outerWrapper">{content}</div>
      </main>
    </div>
  );
};

export default MainPage;
