import {
  CLOSE_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  SHOW_ORDER,
} from "../actions/index.js";

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
  showOrder: false,
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order,
      };
    case GET_ORDER_FAILED:
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
        order: null,
      };
    case SHOW_ORDER:
      return {
        ...state,
        showOrder: true,
      };
    case CLOSE_ORDER:
      return {
        ...state,
        showOrder: false,
        order: null,
      };

    default:
      return state;
  }
};
