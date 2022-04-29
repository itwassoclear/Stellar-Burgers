import {
  CLOSE_DETAILS,
  GET_DETAILS_REQUEST,
  SHOW_DETAILS,
} from "../actions/index.js";

const initialState = {
  details: null,
  showDetails: false,
};

export const itemDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAILS_REQUEST:
      return {
        ...state,
        details: action.details,
      };
    case SHOW_DETAILS:
      return {
        ...state,
        showDetails: true,
      };
    case CLOSE_DETAILS:
      return {
        ...state,
        showDetails: false,
        details: null,
      };

    default:
      return state;
  }
};
