import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  SET_USER,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from "../actions/user";
import type { TGetUserActions, TUpdateUserActions } from "../actions/user";
import type { TRegisterForm } from "../../utils/types";

type TUserState = {
  user: null;
  form: TRegisterForm;
  isUser: boolean;
  getUserRequest: boolean;
  getUserFailed: boolean;
};

type TUpdateUserState = {
  form: TRegisterForm;
  getUserRequest: boolean;
  getUserFailed: boolean;
  isUpdated: boolean;
};

const initialUserState: TUserState = {
  user: null,
  form: {
    email: "",
    name: "",
    password: "",
  },
  isUser: false,
  getUserRequest: false,
  getUserFailed: false,
};

const initialUpdateUserState: TUpdateUserState = {
  form: {
    email: "",
    name: "",
    password: "",
  },
  getUserRequest: false,
  getUserFailed: false,
  isUpdated: false,
};

export const userReducer = (
  state = initialUserState,
  action: TGetUserActions
): TUserState => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        isUser: true,
        form: action.form,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserFailed: true,
        getUserRequest: false,
        isUser: false,
      };
    }

    default:
      return state;
  }
};

export const userUpdateReducer = (
  state = initialUpdateUserState,
  action: TUpdateUserActions
): TUpdateUserState => {
  switch (action.type) {
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        form: { ...state.form, ...action.form },
        isUpdated: true,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: true,
        isUpdated: false,
      };
    }
    case SET_USER: {
      return {
        ...state,
        form: { ...state.form, ...action.payload },
      };
    }

    default:
      return state;
  }
};
