import { IBurgerConstructorIngredientData, IGetTotalCost, IIngredientData } from './types';

const getTotalCost: IGetTotalCost = (ingredientsDataArray): number => {
  const bunsCount = 2;
  const totalCost = ingredientsDataArray.reduce(
    (sum: number, ingredientData: IIngredientData | IBurgerConstructorIngredientData) => {
      if (ingredientData.type === 'bun') {
        return sum + ingredientData.price * bunsCount;
      }
      return sum + ingredientData.price;
    },
    0
  );

  return totalCost;
};

export default getTotalCost;
