import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { getUser } from "../services/actions/user";
import { ProfileMenu } from "../components/profile-menu";
import { TRootState } from "../services/reducers";
import styles from "./pages.module.css";

export const OrderInfoPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isUser = useSelector((store: TRootState) => store.user.isUser);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (!isUser) {
    history.push("/login");
  }

  return (
    <div className={styles.orderWrapper}>
      <ProfileMenu activeLink={"order-info"} />
    </div>
  );
};
