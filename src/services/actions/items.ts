import { API_URL } from "../../utils/api-url";
import { checkResponse } from "../../utils/checkResponse";
import { AppDispatch, AppThunk } from "../types/index";
import { TIngredients } from "../types/data";

export const GET_ITEMS_REQUEST: "GET_ITEMS_REQUEST" = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS: "GET_ITEMS_SUCCESS" = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED: "GET_ITEMS_FAILED" = "GET_ITEMS_FAILED";

interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}

interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: Array<TIngredients>;
}

interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
}

export type TItemsActions =
  | IGetItemsRequest
  | IGetItemsSuccess
  | IGetItemsFailed;

export const getItems: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });

    fetch(API_URL + "ingredients")
      .then(checkResponse)
      .then((data) => {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      });
  };
};
