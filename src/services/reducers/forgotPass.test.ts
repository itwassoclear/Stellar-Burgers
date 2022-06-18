import { forgotPassReducer, initialState } from "./forgotPass";
import * as types from "../actions/forgotPass";
import type { TForgotPassActions } from "../actions/forgotPass";

const form = {
  email: "itwassoclear@gmail.com",
};

describe("forgotPassReducer reducer", () => {
  it("should return the initial state", () => {
    expect(forgotPassReducer(undefined, {} as TForgotPassActions)).toEqual(
      initialState
    );
  });

  it("should handle FORGOT_PASSWORD_REQUEST", () => {
    expect(
      forgotPassReducer(initialState, {
        type: types.FORGOT_PASSWORD_REQUEST,
      })
    ).toEqual({
      ...initialState,
      forgotPassRequest: true,
    });
  });

  it("should handle FORGOT_PASSWORD_FAILED", () => {
    expect(
      forgotPassReducer(initialState, {
        type: types.FORGOT_PASSWORD_FAILED,
      })
    ).toEqual({
      ...initialState,
      forgotPassRequest: false,
      forgotPassFailed: true,
    });
  });

  it("should handle FORGOT_PASSWORD_SUCCESS", () => {
    expect(
      forgotPassReducer(initialState, {
        type: types.FORGOT_PASSWORD_SUCCESS,
        form: form,
      })
    ).toEqual({
      ...initialState,
      forgotPassRequest: false,
    });
  });

  it("should handle RESET_PASSWORD", () => {
    expect(
      forgotPassReducer(initialState, {
        type: types.RESET_PASSWORD,
        payload: form,
      })
    ).toEqual({
      ...initialState,
      form: form,
    });
  });
});
