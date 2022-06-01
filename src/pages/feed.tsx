import clsx from "clsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import { FeedItem } from "../components/feed-item/feed-item";
import OrderInfo from "../components/order-info/order-info";

import { getUser } from "../services/actions/user";
import { TRootState } from "../services/types/index";
import styles from "./pages.module.css";
import {
  wsConnectionAllStart,
  wsConnectionClosed,
} from "../services/actions/websocket";

import {
  CLOSE_DETAILS,
  SHOW_DETAILS,
  getDetails,
} from "../services/actions/details";
import Modal from "../components/modal/modal";
import { TOrders } from "../services/types/data";

type TLocationState = {
  main?: Location<TLocationState>;
  from?: { pathname: string };
};

export const FeedPage = () => {
  const dispatch = useDispatch();
  const location = useLocation<TLocationState>();
  const history = useHistory();
  const data = useSelector((store: TRootState) => store.ws.messages);
  const total = useSelector((store: TRootState) => store.ws.total);
  const totalToday = useSelector((store: TRootState) => store.ws.totalToday);
  console.log(6666666, data, total, totalToday);

  const showDetails = useSelector(
    (store: TRootState) => store.itemDetails.showDetails
  );

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
    dispatch(wsConnectionAllStart());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  const doneOrders = data
    ? data?.filter((item) => item.status === "done")
    : null;
  const pendingOrders = data
    ? data?.filter((item) => item.status === "pending")
    : null;

  return (
    <section className={styles.feedBox}>
      {showDetails && (
        <Modal onClose={handleCloseModal} header=''>
          <OrderInfo details={data} />
        </Modal>
      )}
      <p className='text text_type_main-large mb-6'>Лента заказов</p>
      <div className={styles.feed}>
        <div className={styles.items} style={{ width: "600px" }}>
          {data && data.length !== 0
            ? data?.map((data) => {
                return (
                  <Link
                    key={data._id}
                    className={styles.link}
                    to={{
                      pathname: `/feed/${data._id}`,
                      state: { main: location },
                    }}
                  >
                    <FeedItem data={data} handleOpenModal={handleOpenModal} />
                  </Link>
                );
              })
            : null}
        </div>
        <div className={clsx(styles.orders, "ml-15")}>
          <div className={styles.ordersTable}>
            <div className={clsx(styles.ready, "mr-9")}>
              <p
                className={clsx(styles.name, "text text_type_main-medium mb-6")}
              >
                Готовы:
              </p>
              {doneOrders?.slice(0, 10).map((el) => (
                <p
                  className={clsx(
                    styles.readyNumber,
                    "mb-2 text text_type_digits-default"
                  )}
                  key={el.number}
                >
                  {el.number}
                </p>
              ))}
            </div>
            <div className={clsx(styles.ready, styles.nextTable, "mr-9")}>
              {doneOrders?.slice(10, 20).map((el) => (
                <p
                  className={clsx(
                    styles.readyNumber,
                    "mb-2 text text_type_digits-default"
                  )}
                  key={el.number}
                >
                  {el.number}
                </p>
              ))}
            </div>
            <div className={styles.inProgress}>
              <p
                className={clsx(styles.name, "text text_type_main-medium mb-6")}
              >
                В работе:
              </p>
              <p
                className={clsx(
                  styles.inProgressNumber,
                  "mb-2 text text_type_digits-default"
                )}
              ></p>
              {pendingOrders?.map((el) => (
                <p
                  className={clsx(
                    styles.inProgressNumber,
                    "mb-2 text text_type_digits-default"
                  )}
                  key={el.number}
                >
                  {el.number}
                </p>
              ))}
            </div>
          </div>
          <div className={clsx(styles.ordersTotal, "mt-15")}>
            <p className={clsx(styles.name, "text text_type_main-medium")}>
              Выполнено за все время:
            </p>
            <p
              className={clsx(
                styles.ordersDigits,
                "text text_type_digits-large"
              )}
            >
              1234567890
            </p>
          </div>
          <div className={clsx(styles.ordersToday, "mt-15")}>
            <p className={clsx(styles.name, "text text_type_main-medium")}>
              Выполнено за сегодня:
            </p>
            <p
              className={clsx(
                styles.ordersDigits,
                "text text_type_digits-large"
              )}
            >
              1234567890
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
