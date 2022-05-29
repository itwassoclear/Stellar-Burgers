import { API_URL } from "../../utils/api-url";
import { getCookie, deleteCookie } from "../../utils/cookie";
import { checkResponse } from "../../utils/checkResponse";
import type { AppDispatch } from "../../utils/types";

export const GET_LOGOUT_REQUEST: "GET_LOGOUT_REQUEST" = "GET_LOGOUT_REQUEST";
export const GET_LOGOUT_SUCCESS: "GET_LOGOUT_SUCCESS" = "GET_LOGOUT_SUCCESS";
export const GET_LOGOUT_FAILED: "GET_LOGOUT_REQUEST" = "GET_LOGOUT_REQUEST";

interface IGetLogoutRequest {
  readonly type: typeof GET_LOGOUT_REQUEST;
}

interface IGetLogoutSuccess {
  readonly type: typeof GET_LOGOUT_SUCCESS;
}

interface IGetLogoutFailed {
  readonly type: typeof GET_LOGOUT_FAILED;
}

export type TLogoutActions =
  | IGetLogoutRequest
  | IGetLogoutSuccess
  | IGetLogoutFailed;

export const logout = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_LOGOUT_REQUEST,
    });

    fetch(API_URL + "auth/logout", {
      method: "POST",
      body: JSON.stringify({
        token: getCookie("refreshToken"),
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then(checkResponse)
      .then((data) => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        dispatch({
          type: GET_LOGOUT_SUCCESS,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_LOGOUT_FAILED,
        });
      });
  };
};
