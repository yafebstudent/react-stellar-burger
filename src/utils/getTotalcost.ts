import { IBurgerConstructorIngredientData, IGetTotalCost, IIngredientData } from './types';

const getTotalCost: IGetTotalCost = (ingredientsDataArray, bunsCount): number => {
  const totalCost = ingredientsDataArray.reduce(
    (sum: number, ingredientData: IIngredientData | IBurgerConstructorIngredientData) => {
      if (ingredientData.type === 'bun' && bunsCount > 1) {
        return sum + ingredientData.price * bunsCount;
      }
      return sum + ingredientData.price;
    },
    0
  );

  return totalCost;
};

export default getTotalCost;
