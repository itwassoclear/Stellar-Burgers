import { combineReducers } from "redux";
import { ADD_BUN,
  ADD_INGREDIENT,
  CALC_PRICE,

  CLOSE_DETAILS,
  CLOSE_ORDER,
  DELETE_INGREDIENT,
  GET_DETAILS_REQUEST,
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,

  GET_ITEMS_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,

  GET_ORDER_SUCCESS,
  MOVE_INGREDIENT,
  RESET,
  SHOW_DETAILS,
  SHOW_ORDER } from "../actions/index.js";
import { initialState } from "../initialState.js";

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_ITEMS_REQUEST:
    return {
      ...state,
      itemsRequest: true,
      itemsFailed: false
    };
  case GET_ITEMS_SUCCESS:
    return {
      ...state,
      items: action.items,
      itemsRequest: false,
      itemsFailed: false
    };
  case GET_ITEMS_FAILED:
    return {
      ...state,
      items: [],
      itemsRequest: false,
      itemsFailed: true
    };

  default:
    return state;
  }
};

const constructorItemsReducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_BUN:
    return {
      ...state,
      bun: action.item
    };
  case ADD_INGREDIENT:
    return {
      ...state,
      ingredients: [...state.ingredients, action.item]
    };
  case DELETE_INGREDIENT:
    return {
      ...state,
      ingredients: state.ingredients.filter((item, index) => index !== action.index)
    };
  case MOVE_INGREDIENT:
    return {
      ...state,
      ingredients: action.optional
    };
  case RESET:
    return {
      ...initialState
    };
  case CALC_PRICE:
    return {
      ...state,
      totalPrice: state.constructorIngredients.reduce(function (sum, cur) {
        return sum + (cur.price * (cur.type === "bun" ? 2 : 1));
      }, 0)
    };

  default:
    return state;
  }
};

const itemDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_DETAILS_REQUEST:
    return {
      ...state,
      details: action.details
    };
  case SHOW_DETAILS:
    return {
      ...state,
      showDetails: true
    };
  case CLOSE_DETAILS:
    return {
      ...state,
      showDetails: false,
      details: null
    };

  default:
    return state;
  }
};

const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_ORDER_REQUEST:
    return {
      ...state,
      orderRequest: true,
      orderFailed: false
    };
  case GET_ORDER_SUCCESS:
    return {
      ...state,
      orderRequest: false,
      orderFailed: false,
      order: action.order
    };
  case GET_ORDER_FAILED:
    return {
      ...state,
      orderRequest: false,
      orderFailed: true,
      order: null
    };
  case SHOW_ORDER:
    return {
      ...state,
      showOrder: true
    };
  case CLOSE_ORDER:
    return {
      ...state,
      showOrder: false,
      order: null
    };

  default:
    return state;
  }
};

export const rootReducer = combineReducers({
  items: itemsReducer, // все ингредиенты
  constructorItems: constructorItemsReducer, // добавленные в конструктор
  itemDetails: itemDetailsReducer, // содержимое попапа с деталями
  orderDetails: orderDetailsReducer // содержимое попапа с заказом
});
