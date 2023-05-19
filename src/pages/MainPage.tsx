import React, { FC } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import LoadingSpinner from '../components/loading-spinner/LoadingSpinner';
import { useGetIngredientsDataQuery } from '../services/stellarBurgersAPI';
import BurgerIngredients from '../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../components/burger-constructor/BurgerConstructor';

const MainPage: FC = () => {
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
    <main>
      <div className="outerWrapper">{content}</div>
    </main>
  );
};

export default MainPage;
