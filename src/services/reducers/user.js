import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
} from "../actions/index.js";

const initialState = {
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

export const userReducer = (state = initialState, action) => {
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
