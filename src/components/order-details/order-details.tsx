import { FC } from "react";
import clsx from "clsx";

import styles from "./order-details.module.css";
import image from "../../images/done.png";
import Loader from "../loader/loader";
import { TOrder } from "../../utils/types";

type TOrderProps = {
  order: TOrder | null;
};

const OrderDetails: FC<TOrderProps> = ({ order }) => {
  console.log(order);
  return (
    <div className={clsx(styles.order, "pb-30")}>
      {order && (
        <>
          <p
            className={clsx(styles.number, "text text_type_digits-large pb-8")}
          >
            {order.order.number}
          </p>
          <p className={clsx(styles.text, "text text_type_main-medium pb-15")}>
            идентификатор заказа
          </p>
          <img className='mb-15' src={image} alt='Заказ успешно создан' />
          <p className='text text_type_main-default mb-2'>
            Ваш заказ начали готовить
          </p>
          <p className='text text_type_main-default text_color_inactive'>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
      {!order && (
        <div className='m-30'>
          <p className='mb-20 text text_color_inactive text_type_main-medium'>
            Подсчитываем стоимость и формируем заказ
          </p>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
