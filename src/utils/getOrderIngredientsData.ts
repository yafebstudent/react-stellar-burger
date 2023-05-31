import { IIngredientData, TGetOrderIngredientsData } from './types';

const getOrderIngredientsData: TGetOrderIngredientsData = (
  ingredientsIDArray,
  ingredientsDataArray
) => {
  const orderIngredientsData: IIngredientData[] = [];

  ingredientsIDArray.forEach((ingredientID) => {
    if (ingredientID) {
      const ingredientData = ingredientsDataArray.find(
        (ingredientDataItem) => ingredientDataItem._id === ingredientID
      );

      if (ingredientData) {
        orderIngredientsData.push(ingredientData);
      }
    }
  });

  return orderIngredientsData;
};

export default getOrderIngredientsData;
