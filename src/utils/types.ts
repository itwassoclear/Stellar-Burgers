import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { store } from "../services/store";
import { TRootState } from "../services/reducers/index";

import { TConstructorActions } from "../services/actions/constructor";
import { TDetailsActions } from "../services/actions/details";
import { TItemsActions } from "../services/actions/items";
import { TLoginActions } from "../services/actions/login";
import { TOrderActions } from "../services/actions/order";
import { TRegistrationActions } from "../services/actions/registration";

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

export type TAppActions =
  | TConstructorActions
  | TDetailsActions
  | TItemsActions
  | TLoginActions
  | TOrderActions
  | TRegistrationActions;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootState, TAppActions>
>;

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
