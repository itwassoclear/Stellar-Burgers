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
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit && payload?.token) {
        socket = new WebSocket(
          `${wsUrl}?token=${getCookie("accessToken")
            ?.split("Bearer ")
            .join("")}`
        );
      } else if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          socket!.close();
          socket = null;
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};
