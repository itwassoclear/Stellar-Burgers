import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import { getUser, logout } from "../services/actions";
import clsx from "clsx";

export function OrderInfoPage() {
  const useStyles = makeStyles(() => ({
    wrapper: {
      width: "860px",
      margin: "120px auto 0",
      textAlign: "left",
      display: "flex",
    },
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
    },
    activeLink: {
      textDecoration: "none",
      color: "#fff",
      height: "64px",
      display: "flex",
      alignItems: "center",
    },
    form: {
      width: "480px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },
    buttons: {
      display: "flex",
    },
  }));

  const classes = useStyles();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    dispatch(getUser());
  };

  return (
    <div className={classes.wrapper}>
      <div className={clsx(classes.links, "mr-15")}>
        <Link
          to='/profile'
          className={clsx(classes.link, "text text_type_main-medium")}
        >
          Профиль
        </Link>
        <Link
          to='/profile/orders'
          className={clsx(classes.activeLink, "text text_type_main-medium")}
        >
          История заказов
        </Link>
        <button
          onClick={logoutUser}
          className={clsx(classes.button, "text text_type_main-medium")}
        >
          Выход
        </button>
      </div>
    </div>
  );
}
