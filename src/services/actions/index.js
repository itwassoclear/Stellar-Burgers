import { API_URL } from "../../utils/api-url";
import { getCookie, setCookie, deleteCookie } from "../../utils/cookie";
import { checkResponse } from "../../utils/checkResponse";

export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST"; //itemsReducer
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";

export const ADD_BUN = "ADD_BUN"; // constructorItemsReducer
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const UPDATE_POSITION = "UPDATE_POSITION";
export const CALC_PRICE = "CALC_PRICE";
export const RESET = "RESET";

export const GET_DETAILS_REQUEST = "GET_DETAILS_REQUEST"; // itemDetailsReducer
export const SHOW_DETAILS = "SHOW_DETAILS";
export const CLOSE_DETAILS = "CLOSE_DETAILS";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST"; // orderDetailsReducer
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const SHOW_ORDER = "SHOW_ORDER";
export const CLOSE_ORDER = "CLOSE_ORDER";

export const GET_REGISTRATION_REQUEST = "GET_REGISTRATION_REQUEST"; // registrationReducer
export const GET_REGISTRATION_SUCCESS = "GET_REGISTRATION_SUCCESS";
export const GET_REGISTRATION_FAILED = "GET_REGISTRATION_FAILED";
export const SET_REGISTRATION = "SET_REGISTRATION";

export const GET_AUTH_REQUEST = "GET_AUTH_REQUEST"; // loginReducer
export const GET_AUTH_SUCCESS = "GET_AUTH_SUCCESS";
export const GET_AUTH_FAILED = "GET_AUTH_FAILED";
export const SET_AUTH = "SET_AUTH";

export const GET_LOGOUT_REQUEST = "GET_LOGOUT_REQUEST"; // logoutReducer
export const GET_LOGOUT_SUCCESS = "GET_LOGOUT_SUCCESS";
export const GET_LOGOUT_FAILED = "GET_LOGOUT_REQUEST";

export const GET_USER_REQUEST = "GET_USER_REQUEST"; // userReducer
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const SET_USER = "SET_USER"; // userUpdateReducer
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export const GET_TOKEN_REQUEST = "GET_TOKEN_REQUEST"; // токен
export const GET_TOKEN_SUCCESS = "GET_TOKEN_SUCCESS";
export const GET_TOKEN_FAILED = "GET_TOKEN_FAILED";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST"; // забыл пароль
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const RESET_PASSWORD = "RESET_PASSWORD";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST"; // восстановил пароль
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const SET_PASSWORD = "SET_PASSWORD";

export function getItems() {
  return function (dispatch) {
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
}

export function getDetails(elem) {
  return function (dispatch) {
    dispatch({
      type: GET_DETAILS_REQUEST,
      details: elem,
    });
  };
}

export function getOrder(arr) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });

    fetch(API_URL + "orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
}

const getUserRequest = async () => {
  const res = await fetch(API_URL + "auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
  });

  return checkResponse(res);
};

const getUpdateUserRequest = async (form) => {
  const res = await fetch(API_URL + "auth/user", {
    method: "PATCH",
    body: JSON.stringify(form),
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
  });

  return checkResponse(res);
};

const refreshToken = async (token) => {
  return await fetch(API_URL + "auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: JSON.stringify({ token }),
    }),
  }).then(checkResponse);
};

export const getUser = () => {
  return async function (dispatch) {
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
        if (err.message === "jwt expired") {
          deleteCookie("accessToken");
          const refreshToken = getCookie("refreshToken");
          const data = refreshToken(refreshToken);
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
        }
      } catch (err) {
        dispatch({
          type: GET_USER_FAILED,
        });
      }
    }
  };
};

export function updateUser(form) {
  return async function (dispatch) {
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
      try {
        if (err.message === "jwt expired") {
          deleteCookie("accessToken");
          const refreshToken = getCookie("refreshToken");
          const data = refreshToken(refreshToken);
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
            });
          }
        }
      } catch (err) {
        console.log(err);
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      }
    }
  };
}

export function register(form) {
  return function (dispatch) {
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
}

export function login(form) {
  return function (dispatch) {
    dispatch({
      type: GET_AUTH_REQUEST,
    });

    fetch(API_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: getCookie("accessToken"),
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
}

export function logout() {
  return function (dispatch) {
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
}

export function forgotPassword(form) {
  return function (dispatch) {
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
        console.log(data.user);
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
}

export function resetPassword(form) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    fetch(API_URL + "password-reset/reset", {
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
}
