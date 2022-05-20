import { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../services/actions";
import { getCookie } from "../../utils/cookie";
import { TRootState } from "../../services/reducers";

type TProtectedRoute = {
  children: RouteProps;
};

export const ProtectedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {
  const isUser = useSelector((store: TRootState) => store.user.isUser);
  const isToken = getCookie("accessToken");
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  if (!isUser && !isToken) {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )}
      />
    );
  }

  return <Route {...rest} render={({ location }) => children} />;
};
