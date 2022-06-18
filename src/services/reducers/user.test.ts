import {
  userReducer,
  userUpdateReducer,
  initialUserState,
  initialUpdateUserState,
} from "./user";
import * as types from "../actions/user";
import { TGetUserActions, TUpdateUserActions } from "../actions/user";

const form = {
  email: "itwassoclear@gmail.com",
  name: "masha",
  password: "qwerty",
};

describe("user reducer", () => {
  it("should return the initial state", () => {
    expect(userReducer(undefined, {} as TGetUserActions)).toEqual(
      initialUserState
    );
  });

  it("should handle GET_USER_REQUEST", () => {
    expect(
      userReducer(initialUserState, {
        type: types.GET_USER_REQUEST,
      })
    ).toEqual({
      ...initialUserState,
      getUserRequest: true,
    });
  });

  it("should handle GET_USER_FAILED", () => {
    expect(
      userReducer(initialUserState, {
        type: types.GET_USER_FAILED,
      })
    ).toEqual({
      ...initialUserState,
      getUserFailed: true,
      getUserRequest: false,
      isUser: false,
    });
  });

  it("should handle GET_USER_SUCCESS", () => {
    expect(
      userReducer(
        {
          form: {
            email: "",
            name: "",
            password: "",
          },
          isUser: true,
        },
        {
          type: types.GET_USER_SUCCESS,
          form: form,
        }
      )
    ).toEqual({
      isUser: true,
      form: form,
    });
  });
});

describe("userUpdate reducer", () => {
  it("should return the initial state", () => {
    expect(userUpdateReducer(undefined, {} as TUpdateUserActions)).toEqual(
      initialUpdateUserState
    );
  });

  it("should handle UPDATE_USER_REQUEST", () => {
    expect(
      userUpdateReducer(initialUpdateUserState, {
        type: types.UPDATE_USER_REQUEST,
      })
    ).toEqual({
      ...initialUpdateUserState,
      getUserRequest: true,
    });
  });

  it("should handle UPDATE_USER_FAILED", () => {
    expect(
      userUpdateReducer(initialUpdateUserState, {
        type: types.UPDATE_USER_FAILED,
      })
    ).toEqual({
      ...initialUpdateUserState,
      getUserRequest: false,
      getUserFailed: true,
      isUpdated: false,
    });
  });

  it("should handle UPDATE_USER_SUCCESS", () => {
    expect(
      userUpdateReducer(
        {
          form: {
            email: "",
            name: "",
            password: "",
          },
          getUserRequest: false,
          getUserFailed: false,
          isUpdated: false,
        },
        {
          type: types.UPDATE_USER_SUCCESS,
          form: form,
        }
      )
    ).toEqual({
      getUserRequest: false,
      getUserFailed: false,
      form: { ...form },
      isUpdated: true,
    });
  });

  it("should handle SET_USER", () => {
    expect(
      userUpdateReducer(
        {
          form: {
            email: "",
            name: "",
            password: "",
          },
        },
        {
          type: types.SET_USER,
          payload: form,
        }
      )
    ).toEqual({
      form: { ...form },
    });
  });
});
