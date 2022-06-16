import { resetPassReducer, initialState } from "./resetPass";
import * as types from "../actions/resetPass";
import type { TResetPassActions } from "../actions/resetPass";

const form = {
  email: "itwassoclear@gmail.com",
  name: "masha",
  password: "qwerty",
};

const resetForm = {
  password: "qwerty",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjZiZjQ1ZmE3NDdlMDAxYmQ0NDMzNSIsImlhdCI6MTY1NTI4NDg3NCwiZXhwIjoxNjU1Mjg2MDc0fQ.hPxgXPxuIP-ansO475YHIbkptkU6ZMCWHMgPRvpbkiw",
};

describe("resetPass reducer", () => {
  it("should return the initial state", () => {
    expect(resetPassReducer(undefined, {} as TResetPassActions)).toEqual(
      initialState
    );
  });

  it("should handle RESET_PASSWORD_REQUEST", () => {
    expect(
      resetPassReducer(initialState, {
        type: types.RESET_PASSWORD_REQUEST,
      })
    ).toEqual({
      ...initialState,
      resetPassRequest: true,
    });
  });

  it("should handle RESET_PASSWORD_FAILED", () => {
    expect(
      resetPassReducer(initialState, {
        type: types.RESET_PASSWORD_FAILED,
      })
    ).toEqual({
      ...initialState,
      isPassReseted: false,
      resetPassRequest: false,
      resetPassFailed: true,
    });
  });

  it("should handle RESET_PASSWORD_SUCCESS", () => {
    expect(
      resetPassReducer(initialState, {
        type: types.RESET_PASSWORD_SUCCESS,
        form: form,
      })
    ).toEqual({
      ...initialState,
      isPassReseted: true,
      resetPassRequest: false,
      resetPassFailed: false,
    });
  });

  it("should handle SET_PASSWORD", () => {
    expect(
      resetPassReducer(initialState, {
        type: types.SET_PASSWORD,
        payload: resetForm,
      })
    ).toEqual({
      ...initialState,
      isPassReseted: false,
      resetPassRequest: false,
      resetPassFailed: false,
      form: resetForm,
    });
  });
});
