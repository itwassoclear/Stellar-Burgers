import styles from "./feed-item.module.css";
import { FC, useMemo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { TRootState } from "../../services/types/index";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { dateCalc } from "../../utils/data";
import { TOrders } from "../../services/types/data";

type TFeedItem = {
  status?: string;
  data: TOrders;
  handleOpenModal: (elem: TOrders) => void;
};

export const FeedItem: FC<TFeedItem> = ({ data, handleOpenModal }) => {
  const location = useLocation();
  const items = useSelector((store: TRootState) => store.items.items);

  const orderStatus: string =
    data.status === "done"
      ? "Выполнен"
      : data.status === "pending"
      ? "Готовится"
      : data.status === "created"
      ? "Создан"
      : "";

  const style = { width: location.pathname === "/feed" ? 532 : 796 };

  const ingredients = useMemo(() => {
    return data.ingredients
      .map((id) => {
        return items.find((item) => item._id === id);
      })
      .filter((data) => data !== undefined)
      .slice(0, 5);
  }, [items, data.ingredients]);

  const otherIngredients =
    data.ingredients.slice(5).length !== 0
      ? {
          number: data.ingredients.slice(5).length,
          id: data.ingredients.slice(5),
        }
      : null;

  const lastIngredientImage = otherIngredients
    ? items.find((item) => item._id === otherIngredients.id[0])
    : null;

  const totalPrice = useMemo(() => {
    let total = 0;
    data.ingredients.map((el) => {
      const orderedItems = items.find((data) => data._id === el);
      if (orderedItems) {
        total += orderedItems.price || 0;
      }
      return total;
    });
    return total;
  }, [data.ingredients, items]);

  return (
    <div
      className={clsx(styles.box, "p-6 mb-4")}
      style={style}
      key={data._id}
      onClick={() => handleOpenModal(data)}
    >
      <div className={clsx(styles.header, "mb-6")}>
        <p className={clsx(styles.number, "text text_type_digits-default")}>
          #{data.number}
        </p>
        <p className='text text_type_main-default text_color_inactive'>
          {dateCalc(data.createdAt)}
        </p>
      </div>

      <p className={clsx(styles.name, "text text_type_main-medium")}>
        {data.name}
      </p>

      {location.pathname !== "/feed" && (
        <p className={clsx(styles.status, "mt-2")}>{orderStatus}</p>
      )}

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
                  src={lastIngredientImage?.image}
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
