import { combineReducers } from "redux";

import { itemsReducer } from "./items";
import { constructorItemsReducer } from "./constructor";
import { itemDetailsReducer } from "./details";
import { orderDetailsReducer } from "./order";
import { registrationReducer } from "./registration";
import { loginReducer } from "./login";
import { logoutReducer } from "./logout";
import { userReducer, userUpdateReducer } from "./user";
import { forgotPassReducer } from "./forgotPass";
import { resetPassReducer } from "./resetPass";

export const rootReducer = combineReducers({
  items: itemsReducer, // все ингредиенты
  constructorItems: constructorItemsReducer, // добавленные в конструктор
  itemDetails: itemDetailsReducer, // содержимое попапа с деталями
  orderDetails: orderDetailsReducer, // содержимое попапа с заказом

  registration: registrationReducer, // регистрация
  login: loginReducer, // авторизация
  logout: logoutReducer, // выход
  user: userReducer, // данные о юзере
  updateUser: userUpdateReducer, // обновление юзера
  forgotPass: forgotPassReducer, // восстановление пароля
  resetPass: resetPassReducer, // обновление пароля
});

export type TRootState = ReturnType<typeof rootReducer>;
