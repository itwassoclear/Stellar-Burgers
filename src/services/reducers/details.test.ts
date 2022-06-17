import { itemDetailsReducer, initialState } from "./details";
import * as types from "../actions/details";
import type { TDetailsActions } from "../actions/details";

const details = {
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  name: "Краторная булка N-200i",
  price: 1255,
  proteins: 80,
  type: "bun",
  __v: 0,
  _id: "60d3b41abdacab0026a733c6",
};

describe("itemDetailsReducer reducer", () => {
  it("should return the initial state", () => {
    expect(itemDetailsReducer(undefined, {} as TDetailsActions)).toEqual(
      initialState
    );
  });

  it("should handle GET_DETAILS_REQUEST", () => {
    expect(
      itemDetailsReducer(initialState, {
        type: types.GET_DETAILS_REQUEST,
        details: details,
      })
    ).toEqual({
      ...initialState,
      details: details,
    });
  });

  it("should handle SHOW_DETAILS", () => {
    expect(
      itemDetailsReducer(initialState, {
        type: types.SHOW_DETAILS,
      })
    ).toEqual({
      ...initialState,
      showDetails: true,
    });
  });

  it("should handle CLOSE_DETAILS", () => {
    expect(
      itemDetailsReducer(initialState, {
        type: types.CLOSE_DETAILS,
      })
    ).toEqual({
      ...initialState,
      showDetails: false,
      details: null,
    });
  });
});
