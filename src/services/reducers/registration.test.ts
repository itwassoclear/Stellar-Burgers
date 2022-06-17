import { registrationReducer, initialState } from "./registration";
import * as types from "../actions/registration";
import type { TRegistrationActions } from "../actions/registration";

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

describe("registrationReducer reducer", () => {
  it("should return the initial state", () => {
    expect(registrationReducer(undefined, {} as TRegistrationActions)).toEqual(
      initialState
    );
  });

  it("should handle GET_REGISTRATION_REQUEST", () => {
    expect(
      registrationReducer(initialState, {
        type: types.GET_REGISTRATION_REQUEST,
      })
    ).toEqual({
      ...initialState,
      registrationRequest: true,
    });
  });

  it("should handle GET_REGISTRATION_FAILED", () => {
    expect(
      registrationReducer(initialState, {
        type: types.GET_REGISTRATION_FAILED,
      })
    ).toEqual({
      ...initialState,
      registrationRequest: false,
      registrationFailed: true,
    });
  });

  it("should handle GET_REGISTRATION_SUCCESS", () => {
    expect(
      registrationReducer(initialState, {
        type: types.GET_REGISTRATION_SUCCESS,
        form: form,
      })
    ).toEqual({
      ...initialState,
      registrationRequest: false,
      form: form,
    });
  });

  it("should handle SET_REGISTRATION", () => {
    expect(
      registrationReducer(initialState, {
        type: types.SET_REGISTRATION,
        payload: form,
      })
    ).toEqual({
      ...initialState,
      form: form,
    });
  });
});
