import { API_URL } from "../../utils/api-url";
import { checkResponse } from "../../utils/checkResponse";
import { setCookie } from "../../utils/cookie";
import type { TRegisterForm, AppDispatch, AppThunk } from "../../utils/types";

export const GET_REGISTRATION_REQUEST: "GET_REGISTRATION_REQUEST" =
  "GET_REGISTRATION_REQUEST";
export const GET_REGISTRATION_SUCCESS: "GET_REGISTRATION_SUCCESS" =
  "GET_REGISTRATION_SUCCESS";
export const GET_REGISTRATION_FAILED: "GET_REGISTRATION_FAILED" =
  "GET_REGISTRATION_FAILED";
export const SET_REGISTRATION: "SET_REGISTRATION" = "SET_REGISTRATION";

interface IGetRegistrationRequest {
  readonly type: typeof GET_REGISTRATION_REQUEST;
}

interface IGetRegistrationSuccess {
  readonly type: typeof GET_REGISTRATION_SUCCESS;
  readonly form: TRegisterForm;
}

interface IGetRegistrationFailed {
  readonly type: typeof GET_REGISTRATION_FAILED;
}

interface ISetRegistration {
  readonly type: typeof SET_REGISTRATION;
  readonly payload: TRegisterForm;
}

export type TRegistrationActions =
  | IGetRegistrationRequest
  | IGetRegistrationSuccess
  | IGetRegistrationFailed
  | ISetRegistration;

export const register: AppThunk = (form: TRegisterForm) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_REGISTRATION_REQUEST,
    });

    fetch(API_URL + "auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(checkResponse)
      .then((data) => {
        setCookie("accessToken", data.accessToken);
        setCookie("refreshToken", data.refreshToken);
        dispatch({
          type: GET_REGISTRATION_SUCCESS,
          form: data.user,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_REGISTRATION_FAILED,
        });
      });
  };
};
