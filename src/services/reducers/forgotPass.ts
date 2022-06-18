import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD,
} from "../actions/forgotPass";
import type { TForgotPassActions } from "../actions/forgotPass";

type TForgotPassState = {
  form: {
    email: string;
  };
  forgotPassRequest: boolean;
  forgotPassFailed: boolean;
};

export const initialState: TForgotPassState = {
  form: {
    email: "",
  },
  forgotPassRequest: false,
  forgotPassFailed: false,
};

export const forgotPassReducer = (
  state = initialState,
  action: TForgotPassActions
): TForgotPassState => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPassRequest: true,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPassRequest: false,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPassRequest: false,
        forgotPassFailed: true,
      };
    }
    case RESET_PASSWORD: {
      return {
        ...state,
        form: action.payload,
      };
    }

    default:
      return state;
  }
};
