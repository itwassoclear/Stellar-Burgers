import {
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILED,
} from "../actions/index.js";

const initialState = {
  getTokenRequest: false,
  getTokenFailed: false,
  refreshToken: "",
};

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN_REQUEST: {
      return {
        ...state,
        getTokenRequest: true,
      };
    }
    case GET_TOKEN_SUCCESS: {
      return {
        ...state,
        getTokenRequest: false,
      };
    }
    case GET_TOKEN_FAILED: {
      return {
        ...state,
        getTokenRequest: false,
        getTokenFailed: true,
      };
    }

    default:
      return state;
  }
};
