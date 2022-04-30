import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";

import { getUser } from "../services/actions";
import { ProfileMenu } from "../components/profile-menu";

export function OrderInfoPage() {
  const useStyles = makeStyles(() => ({
    wrapper: {
      width: "860px",
      margin: "120px auto 0",
      textAlign: "left",
      display: "flex",
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

  return (
    <div className={classes.wrapper}>
      <ProfileMenu />
    </div>
  );
}
