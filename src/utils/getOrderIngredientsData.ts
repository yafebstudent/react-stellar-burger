import { IIngredientData, TGetOrderIngredientsData } from './types';

const getOrderIngredientsData: TGetOrderIngredientsData = (
  ingredientsIDArray,
  ingredientsDataArray
) => {
  return ingredientsIDArray.map(
    (ingredientID: string) =>
      ingredientsDataArray.find(
        (ingredientData) => ingredientData._id === ingredientID
      ) as IIngredientData
  );
};

export default getOrderIngredientsData;
