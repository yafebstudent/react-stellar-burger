import { IBurgerConstructorIngredientData, TGetTotalCost, IIngredientData } from './types';

const getTotalCost: TGetTotalCost = (ingredientsDataArray, bunPriceMultiplier): number => {
  const totalCost = ingredientsDataArray.reduce(
    (sum: number, ingredientData: IIngredientData | IBurgerConstructorIngredientData) => {
      if (ingredientData.type === 'bun' && bunPriceMultiplier > 1) {
        return sum + ingredientData.price * bunPriceMultiplier;
      }
      return sum + ingredientData.price;
    },
    0
  );

  return totalCost;
};

export default getTotalCost;
