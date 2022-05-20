import { FC } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
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
  OrdersPage,
  OrderInfoPage,
} from "../../pages";

import appStyles from "./app.module.css";
import { getItems, getUser } from "../../services/actions/index";
import { ProtectedRoute } from "../protected-route/protected-route";
import { TLocationState } from "../../utils/types";

const App: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TLocationState>();
  const action: boolean =
    history.action === "PUSH" || history.action === "REPLACE";
  const main = action && location.state && location.state.main;

  useEffect(() => {
    dispatch(getItems());
    dispatch(getUser());
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
          <Route path='/reset-password' exact={true}>
            <LoginPage />
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

          <Route path='/profile' exact={true}>
            <ProfilePage />
          </Route>
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
