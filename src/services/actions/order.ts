import { API_URL } from "../../utils/api-url";
import { checkResponse } from "../../utils/checkResponse";
import { getCookie } from "../../utils/cookie";
import { TOrder } from "../types/data";
import { AppDispatch, AppThunk } from "../types/index";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const SHOW_ORDER: "SHOW_ORDER" = "SHOW_ORDER";
export const CLOSE_ORDER: "CLOSE_ORDER" = "CLOSE_ORDER";

interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}

interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: TOrder;
}

interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}

interface IShowOrder {
  readonly type: typeof SHOW_ORDER;
}

interface ICloseOrder {
  readonly type: typeof CLOSE_ORDER;
}

export type TOrderActions =
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed
  | IShowOrder
  | ICloseOrder;

export const getOrder: AppThunk = (arr: string[]) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });

    fetch(API_URL + "orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("accessToken") as string,
      },
      body: JSON.stringify({ ingredients: arr }),
    })
      .then(checkResponse)
      .then((data) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
};
