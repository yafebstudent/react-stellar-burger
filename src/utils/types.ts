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
  listKey?: string;
}
export interface IBurgerConstructorIngredientsDataState {
  burgerConstructorIngredientsData: IBurgerConstructorIngredientData[];
}
export interface IOrderDetailsDataState {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}
export interface IUserDataState {
  userData: {
    accessToken: string;
    refreshToken: string;
    success: boolean;
    user: {
      email: string;
      name: string;
    };
  } | null;
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
export type TGetCookie = (name: string) => string | undefined;
export type TRemoveCookie = (name: string) => void;
interface ISetCookieProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  expires?: number | Date | string;
}
export type TSetCookie = (tokenName: string, value: string, props?: ISetCookieProps) => void;
export interface IOrderData {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}
export type TGetAllOrdersDataQuery = {
  orders: IOrderData[];
  success: boolean;
  total: number;
  totalToday: number;
} | null;
export interface IFeedOrdersItemProps {
  orderData: IOrderData;
  isOrderStatusDisplay: boolean;
}
export type IGetTotalCost = (
  ingredientsDataArray: IBurgerConstructorIngredientData[],
  bunsCount: 1 | 2
) => number;
export type IIsOrderWithStatus = (allOrdersData: IOrderData[], status: string) => boolean;
