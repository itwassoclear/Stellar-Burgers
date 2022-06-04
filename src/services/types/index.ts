import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { store } from "../store";

import { TConstructorActions } from "../actions/constructor";
import { TDetailsActions } from "../actions/details";
import { TItemsActions } from "../actions/items";
import { TLoginActions } from "../actions/login";
import { TOrderActions } from "../actions/order";
import { TRegistrationActions } from "../actions/registration";
import { TWsActions } from "../actions/websocket";
import { rootReducer } from "../reducers";

export type TAppActions =
  | TConstructorActions
  | TDetailsActions
  | TItemsActions
  | TLoginActions
  | TOrderActions
  | TRegistrationActions
  | TWsActions;

export type TRootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootState, TAppActions>
>;

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
