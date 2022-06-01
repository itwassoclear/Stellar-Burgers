import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./pages.module.css";
import OrderInfo from "../components/order-info/order-info";
import { TRootState } from "../services/types/index";
import { responseData } from "../utils/data";
import { FC } from "react";

// import { TIngredients } from "../services/types/data";

export const FeedInfoPage: FC = () => {
  const items = useSelector((store: TRootState) => store.items.items);
  const history = useHistory();
  const id = history.location.pathname.replace("/ingredients/", "");
  const details = responseData.data.orders;

  return (
    <div className={styles.orderDetails}>
      {items && (
        <OrderInfo details={details.filter((el) => el._id === id)[0]} />
      )}
    </div>
  );
};
