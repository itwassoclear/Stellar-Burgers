import { Route, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getUser } from "../../services/actions";
import { getCookie } from "../../utils/cookie";

export function ProtectedRoute({ children, ...rest }) {
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
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
  rest: PropTypes.object,
};
