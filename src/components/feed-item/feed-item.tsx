import styles from "./feed-item.module.css";
import { FC, useMemo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../utils/types";
// import { ImageFeed } from "../image-feed/image-feed";
// import { getDateOrder } from "../../utils/data";
// import { TOrder } from "../../utils/types";
import { TRootState } from "../../services/reducers";
import clsx from "clsx";

// type TOrder = {
//   success: boolean;
//   orders: [
//     {
//       ingredients: string[];
//       _id: string;
//       status: string;
//       number: number;
//       createdAt: string;
//       updatedAt: string;
//     }
//   ];
//   total: number;
//   _id: number;
//   totalToday: number;
// };

// type TFeedItem = {
//   status?: string;
//   data: TOrder;
// };

export const FeedItem: FC = () => {
  const items = useSelector((store: TRootState) => store.items.items);
  const data = {
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
  };

  const orderStatus: string =
    data.orders[0].status === "done"
      ? "Выполнен"
      : data.orders[0].status === "pending"
      ? "Готовится"
      : data.orders[0].status === "created"
      ? "Создан"
      : "";

  const style = { width: orderStatus ? 536 : 796 };

  const ingredients = useMemo(() => {
    return data.orders[0].ingredients
      .map((id) => {
        return items.find((item) => item._id === id);
      })
      .filter((data) => data !== undefined)
      .slice(0, 5);
  }, [items]);

  const otherIngredients =
    data.orders[0].ingredients.slice(5).length !== 0
      ? {
          number: data.orders[0].ingredients.slice(5).length,
          id: data.orders[0].ingredients.slice(5),
        }
      : null;

  const lastIngredientImage = items.find(
    (item) => item._id === otherIngredients.id[0]
  );

  const totalPrice = useMemo(() => {
    let total = 0;
    data.orders[0].ingredients.map((el) => {
      const orderedItems = items.find((data) => data._id === el);
      if (orderedItems) {
        total += orderedItems.price || 0;
      }
    });
    return total;
  }, [ingredients]);

  return (
    <div className={clsx(styles.box, "p-6 mb-4")} style={style}>
      <div className={clsx(styles.header, "mb-6")}>
        <p className={clsx(styles.number, "text text_type_digits-default")}>
          #{data.orders[0].number}
        </p>
        <p className='text text_type_main-default text_color_inactive'>
          {data.orders[0].createdAt}
        </p>
      </div>

      <p className={clsx(styles.name, "text text_type_main-medium")}>
        {data.orders[0].name}
      </p>

      <p className={clsx(styles.status, "mt-2")}>{orderStatus}</p>
      {/* нужен только в orders/:id */}

      <div className={clsx(styles.details, "mt-6")}>
        <div className={styles.ingredients}>
          {data &&
            ingredients.map((data) => {
              return (
                <div className={styles.item}>
                  {data && (
                    <img
                      className={styles.image}
                      src={data.image}
                      alt='Ингредиент бургера'
                    />
                  )}
                </div>
              );
            })}
          {otherIngredients && (
            <div className={styles.item}>
              <p
                className={clsx(
                  styles.lastItemsNumber,
                  "text text_type_main-small"
                )}
              >
                {`+${otherIngredients.number}`}
              </p>
              <div className={styles.itemBg}></div>
              {data && (
                <img
                  className={styles.image}
                  src={lastIngredientImage.image}
                  alt='Ингредиент бургера'
                />
              )}
            </div>
          )}
        </div>
        <div className={styles.total}>
          <span
            className={clsx(
              styles.number,
              "text text_type_digits-default ml-6"
            )}
          >
            {totalPrice}
          </span>
          <div className='ml-2'>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </div>
  );
};
