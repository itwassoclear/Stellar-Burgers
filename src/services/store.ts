import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/index";

import { createSocketMiddleware } from "./middleware/socketMiddleware";
import { wsActions } from "../services/actions/websocket";

const wsUrl = "wss://norma.nomoreparties.space/orders";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, createSocketMiddleware(wsUrl, wsActions))
);
export const store = createStore(rootReducer, enhancer);
