import {
  SET_USER,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from "../actions/index.js";

const initialState = {
  form: {
    email: "",
    name: "",
    password: "",
  },
  getUserRequest: false,
  getUserFailed: false,
};

export const userUpdateReducer = (state = initialState, action) => {
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
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: true,
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
