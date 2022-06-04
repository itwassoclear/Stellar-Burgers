import { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "../../services/types/index";
import { getUser } from "../../services/actions/user";
import { getCookie } from "../../utils/cookie";

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const isUser = useSelector((store) => store.user.isUser);
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
