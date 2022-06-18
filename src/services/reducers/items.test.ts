import { itemsReducer, initialState } from "./items";
import * as types from "../actions/items";
import type { TItemsActions } from "../actions/items";

const items = [
  {
    __v: 0,
    _id: "60d3b41abdacab0026a733c6",
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    name: "Краторная булка N-200i",
    price: 1255,
    proteins: 80,
    type: "bun" as "bun" | "sauce" | "main",
    dragId: "ee84be63-4fe3-4fdb-a83b-2ee5b42bcbde",
    payload: {
      calories: 643,
      carbohydrates: 85,
      fat: 26,
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
      name: "Флюоресцентная булка R2-D3",
      price: 988,
      proteins: 44,
      type: "bun" as "bun" | "sauce" | "main",
      __v: 0,
      _id: "60d3b41abdacab0026a733c7",
    },
  },
];

describe("itemsReducer reducer", () => {
  it("should return the initial state", () => {
    expect(itemsReducer(undefined, {} as TItemsActions)).toEqual(initialState);
  });

  it("should handle GET_ITEMS_REQUEST", () => {
    expect(
      itemsReducer(initialState, {
        type: types.GET_ITEMS_REQUEST,
      })
    ).toEqual({
      ...initialState,
      itemsRequest: true,
      itemsFailed: false,
    });
  });

  it("should handle GET_ITEMS_FAILED", () => {
    expect(
      itemsReducer(initialState, {
        type: types.GET_ITEMS_FAILED,
      })
    ).toEqual({
      ...initialState,
      items: [],
      itemsRequest: false,
      itemsFailed: true,
    });
  });

  it("should handle GET_ITEMS_SUCCESS", () => {
    expect(
      itemsReducer(initialState, {
        type: types.GET_ITEMS_SUCCESS,
        items: items,
      })
    ).toEqual({
      ...initialState,
      items: items,
      itemsRequest: false,
      itemsFailed: false,
    });
  });
});
