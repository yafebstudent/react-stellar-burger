export interface IIngredientData {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  uuid: string;
  __v: string;
  _id: string;
}
export interface IBurgerConstructorIngredientData extends IIngredientData {
  listKey: string;
}
export interface IGetIngredientsDataQuery {
  data: IIngredientData[];
  success: boolean;
}
export interface IGetIngredientsDataMitation {
  message: string;
  success: boolean;
}
export interface IModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}
export interface IBurgerConstructorToppingElementProps {
  ingredientData: IBurgerConstructorIngredientData;
  index: number;
  swapIngredients: (dragIndex: number, hoverIndex: number) => void;
}
export interface IBurgerIngredientProps {
  ingredientData: IIngredientData;
  openModal: () => void;
}
export interface IModalOverlayProps {
  isModalOpen: boolean;
}
export type TProtectedRouteProps = {
  anonymous: boolean;
  outlet: JSX.Element;
};
interface ISetLinkActiveStyleArg {
  isActive: boolean;
}
export type TSetLinkActiveStyle = (object: ISetLinkActiveStyleArg) => { [key: string]: string };
