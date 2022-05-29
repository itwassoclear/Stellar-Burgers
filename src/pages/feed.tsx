import clsx from "clsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FeedItem } from "../components/feed-item/feed-item";

import { getUser } from "../services/actions/user";
import { TRootState } from "../services/reducers";
import styles from "./pages.module.css";

export const FeedPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isUser = useSelector((store: TRootState) => store.user.isUser);
  const location = useLocation();
  const data = [
    {
      success: true,
      orders: [
        {
          ingredients: [
            "60d3463f7034a000269f45e7",
            "60d3463f7034a000269f45e9",
            "60d3463f7034a000269f45e8",
            "60d3463f7034a000269f45ea",
          ],
          _id: "",
          status: "done",
          number: 0,
          createdAt: "2021-06-23T14:43:22.587Z",
          updatedAt: "2021-06-23T14:43:22.603Z",
        },
      ],
      total: 1,
      _id: 1,
      totalToday: 1,
    },
    {
      success: true,
      orders: [
        {
          ingredients: [
            "60d3463f7034a000269f45e7",
            "60d3463f7034a000269f45e9",
            "60d3463f7034a000269f45e8",
            "60d3463f7034a000269f45ea",
          ],
          _id: "",
          status: "done",
          number: 0,
          createdAt: "2021-06-23T14:43:22.587Z",
          updatedAt: "2021-06-23T14:43:22.603Z",
        },
      ],
      total: 1,
      _id: 1,
      totalToday: 1,
    },
    {
      success: true,
      orders: [
        {
          ingredients: [
            "60d3463f7034a000269f45e7",
            "60d3463f7034a000269f45e9",
            "60d3463f7034a000269f45e8",
            "60d3463f7034a000269f45ea",
          ],
          _id: "",
          status: "done",
          number: 0,
          createdAt: "2021-06-23T14:43:22.587Z",
          updatedAt: "2021-06-23T14:43:22.603Z",
        },
      ],
      total: 1,
      _id: 1,
      totalToday: 1,
    },
    {
      success: true,
      orders: [
        {
          ingredients: [
            "60d3463f7034a000269f45e7",
            "60d3463f7034a000269f45e9",
            "60d3463f7034a000269f45e8",
            "60d3463f7034a000269f45ea",
          ],
          _id: "",
          status: "done",
          number: 0,
          createdAt: "2021-06-23T14:43:22.587Z",
          updatedAt: "2021-06-23T14:43:22.603Z",
        },
      ],
      total: 1,
      _id: 1,
      totalToday: 1,
    },
  ];

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (!isUser) {
    history.push("/login");
  }

  return (
    <section className={styles.feedBox}>
      <p className='text text_type_main-large mb-6'>Лента заказов</p>
      <div className={styles.feed}>
        <div className={styles.items}>
          {data.length !== 0
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
                    <FeedItem />
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
              <p
                className={clsx(
                  styles.readyNumber,
                  "mb-2 text text_type_digits-default"
                )}
              >
                034533
              </p>
              <p
                className={clsx(
                  styles.readyNumber,
                  "mb-2 text text_type_digits-default"
                )}
              >
                034533
              </p>
              <p
                className={clsx(
                  styles.readyNumber,
                  "mb-2 text text_type_digits-default"
                )}
              >
                034533
              </p>
              <p
                className={clsx(
                  styles.readyNumber,
                  "mb-2 text text_type_digits-default"
                )}
              >
                034533
              </p>
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
              >
                034533
              </p>
              <p
                className={clsx(
                  styles.inProgressNumber,
                  "mb-2 text text_type_digits-default"
                )}
              >
                034533
              </p>
            </div>
          </div>
          <div className={clsx(styles.ordersTotal, "mt-15")}>
            <p className={clsx(styles.name, "text text_type_main-medium")}>
              Выполнено за все время:
            </p>
            <p className='text text_type_digits-large'>1234567890</p>
          </div>
          <div className={clsx(styles.ordersToday, "mt-15")}>
            <p className={clsx(styles.name, "text text_type_main-medium")}>
              Выполнено за сегодня:
            </p>
            <p className='text text_type_digits-large'>1234567890</p>
          </div>
        </div>
      </div>
    </section>
  );
};
