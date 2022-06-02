import clsx from "clsx";
import styles from "./order-info.module.css";
import { TOrders } from "../../services/types/data";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TRootState } from "../../services/types/index";
import { useMemo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { dateCalc } from "../../utils/data";

type TDetails = {
  details: TOrders[] | null;
};

export const OrderInfo = ({ details }: TDetails) => {
  const history = useHistory();
  const items = useSelector((store: TRootState) => store.items.items);
  const id = history.location.pathname.replace(
    RegExp("^/[a-z]+/[a-z]+/|^/[a-z]+/"),
    ""
  );
  const data = details?.filter((el: TOrders) => el._id === id)[0];

  const ingredients = useMemo(() => {
    return data?.ingredients
      .map((id: string) => {
        return items.find((item) => item._id === id);
      })
      .filter((data) => data !== undefined);
  }, [items, data?.ingredients]);

  const orderStatus: string =
    data?.status === "done"
      ? "Выполнен"
      : data?.status === "pending"
      ? "Готовится"
      : data?.status === "created"
      ? "Создан"
      : "";

  const totalPrice = useMemo(() => {
    let total = 0;
    data?.ingredients.map((el: string) => {
      const orderedItems = items.find((data) => data._id === el);
      if (orderedItems) {
        total += orderedItems.price || 0;
      }
      return total;
    });
    return total;
  }, [data?.ingredients, items]);

  return (
    <div className={clsx(styles.modal, "ml-10 mr-10 mt-10 mb-15")}>
      <p className={clsx(styles.number, "text text_type_digits-default mb-10")}>
        #{data?.number}
      </p>
      <p className={clsx(styles.name, "text text_type_main-medium mb-3")}>
        {data?.name}
      </p>
      <p className={clsx(styles.status, "text text_type_main-default mb-15")}>
        {orderStatus}
      </p>
      <p className={clsx(styles.name, "text text_type_main-medium mb-6")}>
        Состав:
      </p>
      <div className={styles.ingredients}>
        {ingredients?.map((data) => {
          return (
            <div className={clsx(styles.item, "mb-4")} key={Math.random()}>
              <div className={styles.itemDetails}>
                <div className={styles.itemImage}>
                  <img
                    className={clsx(styles.image)}
                    src={data?.image}
                    alt='Ингредиент бургера'
                  />
                </div>

                <p
                  className={clsx(
                    styles.itemName,
                    "text text_type_main-default mr-4"
                  )}
                >
                  {data?.name}
                </p>
              </div>

              <div className={styles.total}>
                <span
                  className={clsx(
                    styles.itemPrice,
                    "text text_type_digits-default"
                  )}
                >
                  1 x {data?.price}
                </span>
                <div className='ml-2'>
                  <CurrencyIcon type='primary' />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={clsx(styles.bottom, "mt-10")}>
        <p className='text text_type_main-default text_color_inactive'>
          {dateCalc(data?.createdAt as string)}
        </p>
        <div className={styles.totalPrice}>
          <span
            className={clsx(styles.itemPrice, "text text_type_digits-default")}
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

export default OrderInfo;
