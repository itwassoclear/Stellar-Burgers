import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
} from "../actions/items";
import type { TItemsActions } from "../actions/items";
import { TIngredients } from "../types/data";

type TItemsState = {
  items: Array<TIngredients>;
  itemsRequest: boolean;
  itemsFailed: boolean;
};

export const initialState: TItemsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const itemsReducer = (
  state = initialState,
  action: TItemsActions
): TItemsState => {
  switch (action.type) {
    case GET_ITEMS_REQUEST:
      return {
        ...state,
        itemsRequest: true,
        itemsFailed: false,
      };
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.items,
        itemsRequest: false,
        itemsFailed: false,
      };
    case GET_ITEMS_FAILED:
      return {
        ...state,
        items: [],
        itemsRequest: false,
        itemsFailed: true,
      };

    default:
      return state;
  }
};
