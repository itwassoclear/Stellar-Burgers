import { API_URL } from "../../utils/api-url";
import { checkResponse } from "../../utils/checkResponse";
import { TRegisterForm } from "../types/data";
import type { AppDispatch, AppThunk } from "../types/index";

export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" =
  "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" =
  "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" =
  "RESET_PASSWORD_FAILED";
export const SET_PASSWORD: "SET_PASSWORD" = "SET_PASSWORD";

interface IResetPassRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

interface IResetPassSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  form: TRegisterForm;
}

interface IResetPassFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

interface ISetPass {
  readonly type: typeof SET_PASSWORD;
  payload: {
    password: string;
    token: string;
  };
}

export type TResetPassActions =
  | IResetPassRequest
  | IResetPassSuccess
  | IResetPassFailed
  | ISetPass;

export const resetPassword: AppThunk = (form) => {
  return async function (dispatch: AppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    await fetch(API_URL + "password-reset/reset", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkResponse)
      .then((data) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          form: data.user,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
};
