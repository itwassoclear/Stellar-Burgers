import { loginReducer, initialState } from "./login";
import * as types from "../actions/login";
import type { TLoginActions } from "../actions/login";

const form = {
  email: "itwassoclear@gmail.com",
  password: "qwerty",
};

describe("loginReducer reducer", () => {
  it("should return the initial state", () => {
    expect(loginReducer(undefined, {} as TLoginActions)).toEqual(initialState);
  });

  it("should handle GET_AUTH_REQUEST", () => {
    expect(
      loginReducer(initialState, {
        type: types.GET_AUTH_REQUEST,
      })
    ).toEqual({
      ...initialState,
      authRequest: true,
      isAuth: true,
    });
  });

  it("should handle GET_AUTH_FAILED", () => {
    expect(
      loginReducer(initialState, {
        type: types.GET_AUTH_FAILED,
      })
    ).toEqual({
      ...initialState,
      authRequest: false,
      authFailed: true,
      isAuth: false,
    });
  });

  it("should handle GET_AUTH_SUCCESS", () => {
    expect(
      loginReducer(initialState, {
        type: types.GET_AUTH_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      authRequest: false,
      isAuth: true,
    });
  });

  it("should handle SET_AUTH", () => {
    expect(
      loginReducer(initialState, {
        type: types.SET_AUTH,
        payload: form,
      })
    ).toEqual({
      ...initialState,
      form: form,
    });
  });
});
