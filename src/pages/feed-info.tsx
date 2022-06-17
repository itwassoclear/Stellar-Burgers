import { useDispatch, useSelector } from "../services/types/index";
import { useEffect } from "react";

import styles from "./pages.module.css";
import OrderInfo from "../components/order-info/order-info";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../services/actions/websocket";

export function FeedInfoPage() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.ws.orders);

  useEffect(() => {
    dispatch(wsConnectionStart());
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
