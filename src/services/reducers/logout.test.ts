import { logoutReducer, initialState } from "./logout";
import * as types from "../actions/logout";
import type { TLogoutActions } from "../actions/logout";

describe("logoutReducer reducer", () => {
  it("should return the initial state", () => {
    expect(logoutReducer(undefined, {} as TLogoutActions)).toEqual(
      initialState
    );
  });

  it("should handle GET_LOGOUT_REQUEST", () => {
    expect(
      logoutReducer(initialState, {
        type: types.GET_LOGOUT_REQUEST,
      })
    ).toEqual({
      ...initialState,
      logoutRequest: true,
    });
  });

  it("should handle GET_LOGOUT_FAILED", () => {
    expect(
      logoutReducer(initialState, {
        type: types.GET_LOGOUT_FAILED,
      })
    ).toEqual({
      ...initialState,
      logoutRequest: true,
      logout: false,
    });
  });

  it("should handle GET_LOGOUT_SUCCESS", () => {
    expect(
      logoutReducer(initialState, {
        type: types.GET_LOGOUT_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      logoutRequest: false,
      logout: true,
    });
  });
});
