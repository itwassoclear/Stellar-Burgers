import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  SET_PASSWORD,
} from "../actions/resetPass";
import type { TResetPassActions } from "../actions/resetPass";

type TResetPassState = {
  form: {
    password: string;
    token: string;
  };
  isPassReseted: boolean;
  resetPassRequest: boolean;
  resetPassFailed: boolean;
};

const initialState: TResetPassState = {
  form: {
    password: "",
    token: "",
  },
  isPassReseted: false,
  resetPassRequest: false,
  resetPassFailed: false,
};

export const resetPassReducer = (
  state = initialState,
  action: TResetPassActions
): TResetPassState => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPassRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isPassReseted: true,
        resetPassRequest: false,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        isPassReseted: false,
        resetPassRequest: false,
        resetPassFailed: true,
      };
    }
    case SET_PASSWORD: {
      return {
        ...state,
        form: action.payload,
      };
    }

    default:
      return state;
  }
};
