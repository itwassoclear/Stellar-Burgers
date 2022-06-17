import { FC } from "react";
import { useEffect } from "react";
import { RootStateOrAny } from "react-redux";
import { useSelector, useDispatch } from "../../services/types/index";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import clsx from "clsx";

import AppHeader from "../app-header/app-header";
import {
  LoginPage,
  MainPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFoundPage,
  IngredientPage,
  FeedPage,
  FeedInfoPage,
  OrdersPage,
  OrderInfoPage,
} from "../../pages";

import appStyles from "./app.module.css";
import { getItems } from "../../services/actions/items";

import { ProtectedRoute } from "../protected-route/protected-route";
import { TLocationState } from "../../services/types/data";

const App: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TLocationState>();
  const action: boolean =
    history.action === "PUSH" || history.action === "REPLACE";
  const main = action && location.state && location.state.main;

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const { items } = useSelector((state: RootStateOrAny) => state.items);

  return (
    <div className={clsx(appStyles.app, "pb-10")}>
      <>
        <AppHeader />
        <Switch location={main || location}>
          <Route path='/login' exact={true}>
            <LoginPage />
          </Route>
          <Route path='/register' exact={true}>
            <RegisterPage />
          </Route>
          <Route path='/forgot-password' exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path='/reset-password' exact={true}>
            <ResetPasswordPage />
          </Route>
          <Route path='/feed' exact={true}>
            <FeedPage />
          </Route>
          <Route path='/feed/:id' exact={true}>
            <FeedInfoPage />
          </Route>
          <ProtectedRoute path='/profile' exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders' exact={true}>
            <OrdersPage />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders/:id' exact={true}>
            <OrderInfoPage />
          </ProtectedRoute>
          <Route path='/ingredients/:id' exact={true}>
            <IngredientPage />
          </Route>
          <Route path='/' exact={true}>
            <MainPage items={items} />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </>
    </div>
  );
};

export default App;
