import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import styles from "./pages.module.css";
import OrderInfo from "../components/order-info/order-info";
import { TRootState } from "../services/types/index";
import { getUser } from "../services/actions/user";
import { wsConnectionStart } from "../services/actions/websocket";
import { getCookie } from "../utils/cookie";

export function OrderInfoPage() {
  const dispatch = useDispatch();
  const data = useSelector((store: TRootState) => store.ws.messages);

  useEffect(() => {
    dispatch(getUser());
    dispatch(wsConnectionStart(getCookie("accessToken") as string));
  }, [dispatch]);

  return (
    <div className={styles.orderDetails}>
      {data && <OrderInfo details={data} />}
    </div>
  );
}
