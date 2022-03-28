import styles from './order-details.module.css';
import clsx from 'clsx';
import image from '../../images/done.png'

const OrderDetails = () => {
  return (
    <div className={clsx(styles.order, 'pb-30')}>
      <p className={clsx(styles.number, "text text_type_digits-large pb-8")}>034536</p>
      <p className={clsx(styles.text, "text text_type_main-medium pb-15")}>
        идентификатор заказа
      </p>
      <img className="mb-15" src={image} alt="Заказ успешно создан" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
      Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
