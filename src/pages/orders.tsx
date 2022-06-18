import { useEffect } from "react";
import { useDispatch, useSelector } from "../services/types/index";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import { FeedItem } from "../components/feed-item/feed-item";
import OrderInfo from "../components/order-info/order-info";

import { getUser } from "../services/actions/user";
import { ProfileMenu } from "../components/profile-menu";
import styles from "./pages.module.css";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../services/actions/websocket";

import {
  CLOSE_DETAILS,
  SHOW_DETAILS,
  getDetails,
} from "../services/actions/details";
import Modal from "../components/modal/modal";
import { TOrders } from "../services/types/data";
import { getCookie } from "../utils/cookie";

type TLocationState = {
  main?: Location<TLocationState>;
  from?: { pathname: string };
};

export const OrdersPage = () => {
  const dispatch = useDispatch();
  const location = useLocation<TLocationState>();
  const history = useHistory();
  const data = useSelector((store) => store.ws.orders);
  const isUser = useSelector((store) => store.user.isUser);

  const showDetails = useSelector((store) => store.itemDetails.showDetails);

  function handleOpenModal(data: TOrders) {
    dispatch(getDetails(data));
    dispatch({ type: SHOW_DETAILS });
  }

  function handleCloseModal() {
    dispatch({ type: CLOSE_DETAILS });
    history.goBack();
  }

  useEffect(() => {
    dispatch(getUser());
    dispatch(wsConnectionStart(getCookie("accessToken") as string));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  if (!isUser) {
    history.push("/login");
  }

  return (
    <section className={styles.orderWrapper}>
      {showDetails && (
        <Modal onClose={handleCloseModal} header=''>
          <OrderInfo details={data} />
        </Modal>
      )}
      <ProfileMenu activeLink={"history"} />
      <div className={styles.items} style={{ width: "864px" }}>
        {data && data.length !== 0
          ? data?.map((data) => {
              return (
                <Link
                  key={data._id}
                  className={styles.link}
                  to={{
                    pathname: `/profile/orders/${data._id}`,
                    state: { main: location },
                  }}
                >
                  <FeedItem data={data} handleOpenModal={handleOpenModal} />
                </Link>
              );
            })
          : null}
      </div>
    </section>
  );
};
