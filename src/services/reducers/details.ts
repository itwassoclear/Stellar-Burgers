import {
  GET_DETAILS_REQUEST,
  SHOW_DETAILS,
  CLOSE_DETAILS,
} from "../actions/details";
import type { TDetailsActions } from "../actions/details";
import { TIngredientDetails } from "../types/data";

type TDetailsState = {
  details: TIngredientDetails | null;
  showDetails: boolean;
};

export const initialState: TDetailsState = {
  details: null,
  showDetails: false,
};

export const itemDetailsReducer = (
  state = initialState,
  action: TDetailsActions
): TDetailsState => {
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
