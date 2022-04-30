import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import { getUser, logout } from "../services/actions";
import clsx from "clsx";

export function ProfileMenu({ activeLink }) {
  const useStyles = makeStyles(() => ({
    links: { display: "flex", flexDirection: "column", width: "320px" },
    link: {
      textDecoration: "none",
      color: "#8585AD",
      height: "64px",
      display: "flex",
      alignItems: "center",
    },
    button: {
      height: "64px",
      padding: 0,
      background: "none",
      border: "none",
      color: "#8585AD",
      textAlign: "left",
      cursor: "pointer",
    },
    activeLink: {
      textDecoration: "none",
      color: "#fff",
      height: "64px",
      display: "flex",
      alignItems: "center",
    },
  }));

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const isUser = useSelector((store) => store.user.isUser);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (!isUser) {
    history.push("/login");
  }

  const logoutUser = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <div className={classes.wrapper}>
      <div className={clsx(classes.links, "mr-15")}>
        <Link
          to='/profile'
          className={clsx(
            activeLink === "profile" ? classes.activeLink : classes.link,
            "text text_type_main-medium"
          )}
        >
          Профиль
        </Link>
        <Link
          to='/profile/orders'
          className={clsx(
            activeLink === "history" ? classes.activeLink : classes.link,
            "text text_type_main-medium"
          )}
        >
          История заказов
        </Link>
        <button
          onClick={logoutUser}
          className={clsx(classes.button, "text text_type_main-medium")}
        >
          Выход
        </button>

        <p className='text text_type_main-default text_color_inactive mt-20'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
    </div>
  );
}
