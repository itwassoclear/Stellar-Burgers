import { orderDetailsReducer, initialState } from "./order";
import * as types from "../actions/order";
import type { TOrderActions } from "../actions/order";

const order = {
  name: "masha",
  order: {
    number: 17453,
  },
  success: true,
};

describe("orderDetailsReducer reducer", () => {
  it("should return the initial state", () => {
    expect(orderDetailsReducer(undefined, {} as TOrderActions)).toEqual(
      initialState
    );
  });

  it("should handle GET_ORDER_REQUEST", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: types.GET_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      orderRequest: true,
      orderFailed: false,
    });
  });

  it("should handle GET_ORDER_FAILED", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: types.GET_ORDER_FAILED,
      })
    ).toEqual({
      ...initialState,
      orderRequest: false,
      orderFailed: true,
      order: null,
    });
  });

  it("should handle GET_ORDER_SUCCESS", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: types.GET_ORDER_SUCCESS,
        order: order,
      })
    ).toEqual({
      ...initialState,
      orderRequest: false,
      orderFailed: false,
      order: order,
    });
  });

  it("should handle SHOW_ORDER", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: types.SHOW_ORDER,
      })
    ).toEqual({
      ...initialState,
      showOrder: true,
    });
  });

  it("should handle CLOSE_ORDER", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: types.CLOSE_ORDER,
      })
    ).toEqual({
      ...initialState,
      showOrder: false,
      order: null,
    });
  });
});
