import { API_URL } from "../../utils/api-url";
import { setCookie, getCookie } from "../../utils/cookie";
import { checkResponse } from "../../utils/checkResponse";
import { getUser } from "./user";
import type { TLoginForm } from "../types/data";
import type { AppThunk } from "../types/index";

export const GET_AUTH_REQUEST: "GET_AUTH_REQUEST" = "GET_AUTH_REQUEST";
export const GET_AUTH_SUCCESS: "GET_AUTH_SUCCESS" = "GET_AUTH_SUCCESS";
export const GET_AUTH_FAILED: "GET_AUTH_FAILED" = "GET_AUTH_FAILED";
export const SET_AUTH: "SET_AUTH" = "SET_AUTH";

interface IGetAuthRequest {
  readonly type: typeof GET_AUTH_REQUEST;
}

interface IGetAuthSuccess {
  readonly type: typeof GET_AUTH_SUCCESS;
}

interface IGetAuthFailed {
  readonly type: typeof GET_AUTH_FAILED;
}

interface ISetAuth {
  readonly type: typeof SET_AUTH;
  readonly payload: TLoginForm;
}

export type TLoginActions =
  | IGetAuthRequest
  | IGetAuthSuccess
  | IGetAuthFailed
  | ISetAuth;

export const login: AppThunk = (form) => {
  return function (dispatch) {
    dispatch({
      type: GET_AUTH_REQUEST,
    });

    fetch(API_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("accessToken") as string,
      },
      body: JSON.stringify(form),
    })
      .then(checkResponse)
      .then((data) => {
        setCookie("accessToken", data.accessToken);
        setCookie("refreshToken", data.refreshToken);
        dispatch(getUser());
        dispatch({
          type: GET_AUTH_SUCCESS,
          form: data.user,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_AUTH_FAILED,
        });
      });
  };
};
