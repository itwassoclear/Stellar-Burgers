import { constructorItemsReducer, initialState } from "./constructor";
import * as types from "../actions/constructor";
import type { TConstructorActions } from "../actions/constructor";

const ingredient = {
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
};
const ingredients = [
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

const bun = {
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
};

describe("constructorItemsReducer reducer", () => {
  it("should return the initial state", () => {
    expect(
      constructorItemsReducer(undefined, {} as TConstructorActions)
    ).toEqual(initialState);
  });

  it("should handle ADD_BUN", () => {
    expect(
      constructorItemsReducer(initialState, {
        type: types.ADD_BUN,
        index: 0,
        item: ingredient,
        optional: ingredients,
      })
    ).toEqual({
      ...initialState,
      bun: bun,
    });
  });

  it("should handle ADD_INGREDIENT", () => {
    expect(
      constructorItemsReducer(initialState, {
        type: types.ADD_INGREDIENT,
        index: 0,
        item: ingredient,
        optional: ingredients,
      })
    ).toEqual({
      ...initialState,
      ingredients: ingredients,
    });
  });

  it("should handle DELETE_INGREDIENT", () => {
    expect(
      constructorItemsReducer(initialState, {
        type: types.DELETE_INGREDIENT,
        index: 0,
        item: ingredient,
        optional: ingredients,
      })
    ).toEqual({
      ...initialState,
      ingredients: [],
    });
  });

  it("should handle MOVE_INGREDIENT", () => {
    expect(
      constructorItemsReducer(initialState, {
        type: types.MOVE_INGREDIENT,
        index: 0,
        item: ingredient,
        optional: ingredients,
      })
    ).toEqual({
      ...initialState,
      ingredients: ingredients,
    });
  });

  it("should handle RESET", () => {
    expect(
      constructorItemsReducer(initialState, {
        type: types.RESET,
        index: 0,
        item: ingredient,
        optional: ingredients,
      })
    ).toEqual({
      ...initialState,
    });
  });

  it("should handle CALC_PRICE", () => {
    expect(
      constructorItemsReducer(initialState, {
        type: types.CALC_PRICE,
        index: 0,
        item: ingredient,
        optional: ingredients,
      })
    ).toEqual({
      ...initialState,
      totalPrice: 0,
    });
  });
});
