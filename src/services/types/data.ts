import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_USER_MESSAGE,
  WS_GET_ALL_MESSAGE,
} from "../actions/websocket";

export type TElement = {
  type: "bun" | "sauce" | "main";
  _id: string;
  __v: number;
  name: string;
  image: string;
  image_large: string;
  image_mobile: string;
  price: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
};

export type TIngredients = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly __v: number;
  readonly _id: string;
  readonly id?: string;
  readonly payload: TElement;
  readonly dragId: string;
  count?: string;
};

export type TIngredientDetails = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image_large: string;
  name: string;
  proteins: number;
};

export type TLocationState = {
  main: {
    pathname: string;
    state: {};
    search: string;
    hash: string;
  };
};

export type TOrder = {
  name: string;
  order: { number: number };
  success: boolean;
};

export type TOrders = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  owner?: object;
  price?: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TAllOrders = {
  readonly orders: Array<TOrders>;
  readonly success?: boolean;
  readonly total?: number;
  readonly totalToday?: number;
};

export type TProfileMenu = {
  activeLink: string;
};

export type TLoginForm = {
  email: string;
  password: string;
};

export type TRegisterForm = TLoginForm & {
  name: string;
};

export type TWSAction = {
  readonly wsInit: typeof WS_CONNECTION_START;
  readonly onOpen: typeof WS_CONNECTION_SUCCESS;
  readonly onClose: typeof WS_CONNECTION_CLOSED;
  readonly onError: typeof WS_CONNECTION_ERROR;
  readonly onMessage: typeof WS_GET_USER_MESSAGE | typeof WS_GET_ALL_MESSAGE;
};
