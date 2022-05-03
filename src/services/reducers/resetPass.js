import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  SET_PASSWORD,
} from "../actions/index.js";

const initialState = {
  form: {
    password: "",
    token: "",
  },
  isPassReseted: false,
  resetPassRequest: false,
  resetPassFailed: false,
};

export const resetPassReducer = (state = initialState, action) => {
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
