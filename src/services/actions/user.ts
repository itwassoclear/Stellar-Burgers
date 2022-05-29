import { API_URL } from "../../utils/api-url";
import { getCookie, setCookie, deleteCookie } from "../../utils/cookie";
import { checkResponse } from "../../utils/checkResponse";
import type { AppDispatch, AppThunk, TRegisterForm } from "../../utils/types";

export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST"; // userReducer
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";

export const SET_USER: "SET_USER" = "SET_USER"; // userUpdateReducer
export const UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED: "UPDATE_USER_FAILED" = "UPDATE_USER_FAILED";

interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  form: TRegisterForm;
}

interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}

export type TGetUserActions =
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailed;

interface ISetUser {
  readonly type: typeof SET_USER;
  payload: TRegisterForm;
}

interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}

interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  form: TRegisterForm;
}

interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
}

export type TUpdateUserActions =
  | ISetUser
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | IUpdateUserFailed;

const getUserRequest = async () => {
  const res = await fetch(API_URL + "auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken") as string,
    },
  });

  return checkResponse(res);
};

const getUpdateUserRequest = async (form: TRegisterForm) => {
  const res = await fetch(API_URL + "auth/user", {
    method: "PATCH",
    body: JSON.stringify(form),
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken") as string,
    },
  });

  return checkResponse(res);
};

const updateToken = async (token: string | undefined) => {
  return await fetch(API_URL + "auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  }).then(checkResponse);
};

export const getUser = () => {
  return async function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    try {
      const res = await getUserRequest();
      if (res && res.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          form: res.user,
        });
        dispatch({
          type: UPDATE_USER_SUCCESS,
          form: res.user,
        });
      }
    } catch (err) {
      try {
        if (
          err.message === "jwt expired" ||
          err.message === "Token is invalid"
        ) {
          deleteCookie("accessToken");
          const refreshToken = getCookie("refreshToken");
          const data = await updateToken(refreshToken);
          if (data.success) {
            setCookie("accessToken", data.accessToken);
            setCookie("refreshToken", data.refreshToken);
          }

          const res = await getUserRequest();
          if (res.success) {
            dispatch({
              type: GET_USER_SUCCESS,
              form: res.user,
            });
            dispatch({
              type: UPDATE_USER_SUCCESS,
              form: res.user,
            });
          }
        } else {
          dispatch({
            type: GET_USER_FAILED,
          });
          return Promise.reject(err);
        }
      } catch (err) {
        console.log(err);
        dispatch({
          type: GET_USER_FAILED,
        });
      }
    }
  };
};

export const updateUser: AppThunk = (form) => {
  return async function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });

    try {
      const res = await getUpdateUserRequest(form);
      if (res && res.success) {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          form: res.user,
        });
      }
    } catch (err) {
      console.log(err);
      try {
        if (
          err.message === "jwt expired" ||
          err.message === "Token is invalid"
        ) {
          deleteCookie("accessToken");
          const refreshToken = getCookie("refreshToken");
          const data = await updateToken(refreshToken);
          if (data.success) {
            setCookie("accessToken", data.accessToken);
            setCookie("refreshToken", data.refreshToken);
          }

          const res = await getUpdateUserRequest(form);
          if (res && res.success) {
            dispatch({
              type: UPDATE_USER_SUCCESS,
              form: res.user,
            });
            dispatch({
              type: GET_USER_SUCCESS,
              form: res.user,
            });
          }
        } else {
          dispatch({
            type: UPDATE_USER_FAILED,
          });
          return Promise.reject(err);
        }
      } catch (err) {
        console.log(err);
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      }
    }
  };
};
