import { TRootState, AppDispatch } from "../types/index";
import { Middleware, MiddlewareAPI } from "redux";
import { TWSAction } from "../types/data";
import { getCookie } from "../../utils/cookie";

export const createSocketMiddleware = (
  wsUrl: string,
  wsActions: TWSAction
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsAllOrdersInit,
        wsUserOrdersInit,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;
      if (type === wsAllOrdersInit) {
        console.log(1);
        socket = new WebSocket(`${wsUrl}/all`);
      } else if (type === wsUserOrdersInit) {
        socket = new WebSocket(
          `${wsUrl}?token=${getCookie("accessToken")
            ?.split("Bearer ")
            .join("")}`
        );
      }

      if (socket) {
        socket.onopen = (event) => {
          console.log("ws open");
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          console.log("ws error");
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          console.log("ws message");
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          console.log("ws close");
          socket!.close();
          socket = null;
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};
