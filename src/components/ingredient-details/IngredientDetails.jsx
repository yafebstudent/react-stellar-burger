import React from 'react';
import styles from './IngredientDetails.module.css';
import { IngredientDetailsPropType } from '../../utils/prop-types';

const IngredientDetails = (props) => {
  const { activeIngredientData } = props;

  return (
    <div className={styles.ingredientDetails}>
      <p className={`${styles.ingredientDetails__title} text text_type_main-large mt-10 ml-10`}>
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
    </div>
  );
};

IngredientDetails.propTypes = IngredientDetailsPropType;

export default IngredientDetails;
