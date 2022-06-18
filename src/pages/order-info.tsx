import { useDispatch, useSelector } from "../services/types/index";
import { useEffect } from "react";

import styles from "./pages.module.css";
import OrderInfo from "../components/order-info/order-info";
import { getUser } from "../services/actions/user";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../services/actions/websocket";
import { getCookie } from "../utils/cookie";

export function OrderInfoPage() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.ws.orders);

  useEffect(() => {
    dispatch(getUser());
    dispatch(wsConnectionStart(getCookie("accessToken") as string));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
    <div className={styles.orderDetails}>
      {data && <OrderInfo details={data} />}
    </div>
  );
}
