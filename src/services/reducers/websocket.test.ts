import { wsReducer, initialState } from "./websocket";
import * as types from "../actions/websocket";
import { TOrders } from "../types/data";
import type { TWsActions } from "../actions/websocket";

const orders: TOrders[] = [
  {
    _id: "62976e02fa747e001bd4cf8e",
    ingredients: ["60d3b41abdacab0026a733cc"],
    status: "done",
    name: "Spicy бургер",
    createdAt: "2022-06-01T13:47:46.661Z",
    updatedAt: "2022-06-01T13:47:46.958Z",
    number: 16440,
  },
  {
    _id: "62976e41fa747e001bd4cf8f",
    ingredients: ["60d3b41abdacab0026a733cc", "60d3b41abdacab0026a733c9"],
    status: "done",
    name: "Бессмертный spicy бургер",
    createdAt: "2022-06-01T13:48:49.995Z",
    updatedAt: "2022-06-01T13:48:50.402Z",
    number: 16441,
  },
  {
    _id: "6297702dfa747e001bd4cf9d",
    ingredients: [
      "60d3b41abdacab0026a733cd",
      "60d3b41abdacab0026a733d2",
      "60d3b41abdacab0026a733d0",
      "60d3b41abdacab0026a733c7",
    ],
    status: "done",
    name: "Альфа-сахаридный space флюоресцентный минеральный бургер",
    createdAt: "2022-06-01T13:57:01.873Z",
    updatedAt: "2022-06-01T13:57:02.192Z",
    number: 16442,
  },
  {
    _id: "629771b5fa747e001bd4cfa4",
    ingredients: [
      "60d3b41abdacab0026a733cf",
      "60d3b41abdacab0026a733c8",
      "60d3b41abdacab0026a733d0",
      "60d3b41abdacab0026a733c6",
    ],
    status: "done",
    name: "Люминесцентный антарианский краторный минеральный бургер",
    createdAt: "2022-06-01T14:03:33.448Z",
    updatedAt: "2022-06-01T14:03:33.778Z",
    number: 16445,
  },
];

describe("websocket reducer", () => {
  it("should return the initial state", () => {
    expect(wsReducer(undefined, {} as TWsActions)).toEqual(initialState);
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      wsReducer(initialState, {
        type: types.WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      wsConnected: true,
    });
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      wsReducer(initialState, {
        type: types.WS_CONNECTION_ERROR,
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
    });

    expect(
      wsReducer(
        {
          wsConnected: true,
          orders: orders,
          total: 1000,
          totalToday: 10,
        },
        {
          type: types.WS_CONNECTION_ERROR,
        }
      )
    ).toEqual({
      wsConnected: false,
      orders: orders,
      total: 1000,
      totalToday: 10,
    });
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      wsReducer(initialState, {
        type: types.WS_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
    });

    expect(
      wsReducer(
        {
          wsConnected: true,
          orders: orders,
          total: 1000,
          totalToday: 10,
        },
        {
          type: types.WS_CONNECTION_CLOSED,
        }
      )
    ).toEqual({
      wsConnected: false,
      orders: orders,
      total: 1000,
      totalToday: 10,
    });
  });

  it("should handle WS_GET_USER_MESSAGE", () => {
    expect(
      wsReducer(
        { orders: null },
        {
          type: types.WS_GET_USER_MESSAGE,
          payload: {
            orders: orders,
          },
        }
      )
    ).toEqual({
      orders: orders,
    });

    expect(
      wsReducer(
        {
          orders: orders,
        },
        {
          type: types.WS_GET_USER_MESSAGE,
          payload: {
            orders: orders,
          },
        }
      )
    ).toEqual({
      orders: orders,
    });
  });

  it("should handle WS_GET_ALL_MESSAGE", () => {
    expect(
      wsReducer(
        { orders: null, total: null, totalToday: null },
        {
          type: types.WS_GET_ALL_MESSAGE,
          payload: {
            orders: orders,
            total: 1000,
            totalToday: 10,
          },
        }
      )
    ).toEqual({
      orders: orders,
      total: 1000,
      totalToday: 10,
    });
  });
});
