import { API_URL } from "../../utils/api-url";

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const UPDATE_POSITION = 'UPDATE_POSITION';
export const CALC_PRICE = 'CALC_PRICE';
export const RESET = 'RESET';

export const GET_DETAILS_REQUEST = 'GET_DETAILS_REQUEST';
export const SHOW_DETAILS = 'SHOW_DETAILS';
export const CLOSE_DETAILS = 'CLOSE_DETAILS';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const SHOW_ORDER = 'SHOW_ORDER';
export const CLOSE_ORDER = 'CLOSE_ORDER';

export function getItems() {
  return function(dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });

    fetch(API_URL + 'ingredients')
    .then(res => {
      if (!res && !res.success) {
        throw new Error('Something went wrong');
      }
      return res.json();
    })
    .then(data => {
      dispatch({
        type: GET_ITEMS_SUCCESS,
        items: data.data,
      })
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ITEMS_FAILED,
      })
    })
  }
}

export function getDetails(elem) {
  return function(dispatch) {
    dispatch({
      type: GET_DETAILS_REQUEST,
      details: elem,
    });
  }
}

export function getOrder(arr) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });

    fetch(API_URL + 'orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"ingredients": arr})
    })
    .then(res => {
      if (!res && !res.success) {
        throw new Error('Something went wrong');
      }
      return res.json();
    })
    .then(data => {
      dispatch({
        type: GET_ORDER_SUCCESS,
        order: data,
      })
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ORDER_FAILED,
      })
    })
  }
}
