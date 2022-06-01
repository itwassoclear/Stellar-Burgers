import { TAllOrders } from "../types/data";

export const WS_CONNECTION_USER_ORDERS_START: "WS_CONNECTION_USER_ORDERS_START" =
  "WS_CONNECTION_USER_ORDERS_START";
export const WS_CONNECTION_ALL_ORDERS_START: "WS_CONNECTION_ALL_ORDERS_START" =
  "WS_CONNECTION_ALL_ORDERS_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_USER_MESSAGE: "WS_GET_USER_MESSAGE" = "WS_GET_USER_MESSAGE";
export const WS_GET_ALL_MESSAGE: "WS_GET_ALL_MESSAGE" = "WS_GET_ALL_MESSAGE";

export const wsOrdersActions = {
  wsAllOrdersInit: WS_CONNECTION_ALL_ORDERS_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ALL_MESSAGE,
};

export const wsUserOrdersActions = {
  wsUserOrdersInit: WS_CONNECTION_USER_ORDERS_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_USER_MESSAGE,
};

export interface IWsUserAction {
  readonly type: typeof WS_CONNECTION_USER_ORDERS_START;
  readonly payload: object;
}
export interface IWsAllOrdersAction {
  readonly type: typeof WS_CONNECTION_ALL_ORDERS_START;
}
export interface IWsSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWsClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetUserOrdersMessageAction {
  readonly type: typeof WS_GET_USER_MESSAGE;
  readonly payload: TAllOrders;
}
export interface IWsGetAllOrdersMessageAction {
  readonly type: typeof WS_GET_ALL_MESSAGE;
  readonly payload: TAllOrders;
}

export type TWsActions =
  | IWsUserAction
  | IWsAllOrdersAction
  | IWsSuccessAction
  | IWsErrorAction
  | IWsClosedAction
  | IWsGetUserOrdersMessageAction
  | IWsGetAllOrdersMessageAction;

export const wsConnectionStart = (token: string): IWsUserAction => {
  return {
    type: WS_CONNECTION_USER_ORDERS_START,
    payload: { token },
  };
};

export const wsConnectionAllStart = (): IWsAllOrdersAction => {
  console.log("START");
  return {
    type: WS_CONNECTION_ALL_ORDERS_START,
  };
};

export const wsConnectionSuccess = (): IWsSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (): IWsErrorAction => {
  console.log("ERROR");
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = (): IWsClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetAllOrdersMessage = (
  message: TAllOrders
): IWsGetAllOrdersMessageAction => {
  return {
    type: WS_GET_ALL_MESSAGE,
    payload: message,
  };
};

export const wsGetUserOrdersMessage = (
  message: TAllOrders
): IWsGetUserOrdersMessageAction => {
  return {
    type: WS_GET_USER_MESSAGE,
    payload: message,
  };
};
