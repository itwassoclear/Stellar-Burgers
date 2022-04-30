import { Route, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getUser } from "../../services/actions";

export function ProtectedRoute({ children, ...rest }) {
  const isUser = useSelector((store) => store.user.isUser);
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

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isUser ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
  rest: PropTypes.object,
};
