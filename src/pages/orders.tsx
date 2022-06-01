import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";

import { getUser } from "../services/actions/user";
import { ProfileMenu } from "../components/profile-menu";
import { TRootState } from "../services/types/index";
// import { FeedItem } from "../components/feed-item/feed-item";
import styles from "./pages.module.css";

export const OrdersPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isUser = useSelector((store: TRootState) => store.user.isUser);
  const data = [
    {
      success: true,
      orders: [
        {
          ingredients: [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c7",
          ],
          _id: "",
          status: "pending",
          number: 0,
          name: "Бургер",
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
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c7",
          ],
          _id: "",
          status: "pending",
          number: 0,
          name: "Бургер",
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
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c7",
          ],
          _id: "",
          status: "pending",
          number: 0,
          name: "Бургер",
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
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c7",
          ],
          _id: "",
          status: "pending",
          number: 0,
          name: "Бургер",
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
    <div className={styles.orderWrapper}>
      <ProfileMenu activeLink={"history"} />
      <div className={styles.items} style={{ width: "864px" }}>
        {data.length !== 0
          ? data?.map((data) => {
              return (
                <Link
                  key={data._id}
                  className={styles.link}
                  to={{
                    pathname: `/orders/${data._id}`,
                    state: { main: location },
                  }}
                >
                  {/* <FeedItem data={data} /> */}
                </Link>
              );
            })
          : null}
      </div>
    </div>
  );
};
