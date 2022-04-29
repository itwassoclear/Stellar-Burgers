import {
  ADD_BUN,
  ADD_INGREDIENT,
  CALC_PRICE,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  RESET,
} from "../actions/index.js";

const initialState = {
  bun: null,
  ingredients: [],
  totalPrice: 0,
};

export const constructorItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: action.item,
      };
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.item],
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (item, index) => index !== action.index
        ),
      };
    case MOVE_INGREDIENT:
      return {
        ...state,
        ingredients: action.optional,
      };
    case RESET:
      return {
        ...initialState,
      };
    case CALC_PRICE:
      return {
        ...state,
        totalPrice: state.constructorIngredients.reduce(function (sum, cur) {
          return sum + cur.price * (cur.type === "bun" ? 2 : 1);
        }, 0),
      };

    default:
      return state;
  }
};
