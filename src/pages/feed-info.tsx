import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import styles from "./pages.module.css";
import OrderInfo from "../components/order-info/order-info";
import { TRootState } from "../services/types/index";
import { getUser } from "../services/actions/user";
import { wsConnectionAllStart } from "../services/actions/websocket";

export function FeedInfoPage() {
  const dispatch = useDispatch();
  const data = useSelector((store: TRootState) => store.ws.messages);

  useEffect(() => {
    dispatch(getUser());
    dispatch(wsConnectionAllStart());
  }, [dispatch]);

  console.log(77777, data);
  return (
    <div className={styles.orderDetails}>
      {data && <OrderInfo details={data} />}
    </div>
  );
}
