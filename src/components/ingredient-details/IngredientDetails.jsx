import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './IngredientDetails.module.css';
import { useGetIngredientsDataQuery } from '../../services/stellarBurgersAPI';
import { setActiveIngredientData } from '../../services/activeIngredientDataSlice';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';

const IngredientDetails = () => {
  let content;
  const activeIngredientData = useSelector(
    (state) => state.activeIngredientDataReducer.activeIngredientData
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    data: ingredientsResponseData,
    isLoading,
    isFetching,
    isError,
  } = useGetIngredientsDataQuery();

  useEffect(() => {
    if (id) {
      dispatch(
        setActiveIngredientData(
          ingredientsResponseData?.data.filter((ingredientData) => ingredientData._id === id)[0]
        )
      );
    }
  }, [dispatch, id, ingredientsResponseData]);

  if (isError) content = <h4>An error has occurred with ingredients data!</h4>;
  if (isLoading || isFetching) content = <LoadingSpinner />;
  if (activeIngredientData) {
    content = (
      <>
        <p
          style={{ textAlign: id ? 'center' : 'left' }}
          className={`${styles.ingredientDetails__title} text text_type_main-large ${
            id ? '' : 'mt-10 ml-10'
          }`}
        >
          Детали ингредиента
        </p>
        <img
          src={activeIngredientData.image_large}
          alt={activeIngredientData.name}
          className="mb-4"
        />
        <p className="text text_type_main-medium mb-8">{activeIngredientData.name}</p>
        <ul className={`${styles.nutritionalValueList} mb-15`}>
          <li className={`${styles.nutritionalValueList__item} mr-5`}>
            <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
            <span className="text text_type_main-default text_color_inactive">
              {activeIngredientData.calories}
            </span>
          </li>
          <li className={`${styles.nutritionalValueList__item} mr-5`}>
            <span className="text text_type_main-default text_color_inactive">Белки, г</span>
            <span className="text text_type_main-default text_color_inactive">
              {activeIngredientData.proteins}
            </span>
          </li>
          <li className={`${styles.nutritionalValueList__item} mr-5`}>
            <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
            <span className="text text_type_main-default text_color_inactive">
              {activeIngredientData.fat}
            </span>
          </li>
          <li className={`${styles.nutritionalValueList__item} mr-5`}>
            <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
            <span className="text text_type_main-default text_color_inactive">
              {activeIngredientData.carbohydrates}
            </span>
          </li>
        </ul>
      </>
    );
  }

  return (
    <div className={styles.ingredientDetails} style={{ marginTop: id ? '120px' : '0' }}>
      {content}
    </div>
  );
};

export default IngredientDetails;
