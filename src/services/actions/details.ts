import { TIngredientDetails, AppDispatch, AppThunk } from "../../utils/types";

export const GET_DETAILS_REQUEST: "GET_DETAILS_REQUEST" = "GET_DETAILS_REQUEST";
export const SHOW_DETAILS: "SHOW_DETAILS" = "SHOW_DETAILS";
export const CLOSE_DETAILS: "CLOSE_DETAILS" = "CLOSE_DETAILS";

interface IGetDetailsRequest {
  readonly type: typeof GET_DETAILS_REQUEST;
  readonly details: TIngredientDetails;
}

interface IShowDetails {
  readonly type: typeof SHOW_DETAILS;
}

interface ICloseDetails {
  readonly type: typeof CLOSE_DETAILS;
}

export type TDetailsActions = IGetDetailsRequest | IShowDetails | ICloseDetails;

export const getDetails: AppThunk = (elem: TIngredientDetails) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_DETAILS_REQUEST,
      details: elem,
    });
  };
};
