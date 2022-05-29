import { API_URL } from "../../utils/api-url";
import { checkResponse } from "../../utils/checkResponse";
import { AppDispatch, AppThunk } from "../../utils/types";

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" =
  "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" =
  "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" =
  "FORGOT_PASSWORD_FAILED";
export const RESET_PASSWORD: "RESET_PASSWORD" = "RESET_PASSWORD";

interface IForgotPassRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

interface IForgotPassSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
  form: { email: string };
}

interface IForgotPassFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

interface IResetPass {
  readonly type: typeof RESET_PASSWORD;
  payload: { email: string };
}

export type TForgotPassActions =
  | IForgotPassRequest
  | IForgotPassSuccess
  | IForgotPassFailed
  | IResetPass;

export const forgotPassword: AppThunk = (form) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });

    fetch(API_URL + "password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
      }),
    })
      .then(checkResponse)
      .then((data) => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          form: data.user,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      });
  };
};
