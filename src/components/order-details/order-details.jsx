import React, { useContext } from 'react';
import clsx from 'clsx';

import styles from './order-details.module.css';
import image from '../../images/done.png';
import { API_URL } from '../../utils/api-url';
import Loader from '../loader/loader';

import { BurgerContext } from '../../utils/burger-context';

const OrderDetails = () => {
  const ingredients = useContext(BurgerContext);

  const [data, setData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    const getProductData = async () => {
      setIsLoading(true);
      const ingredientsArr = ingredients.map(el => el._id);
      try {
        const response = await fetch(API_URL + 'orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"ingredients": ingredientsArr})
        });
        if (!response.ok) {
          setIsError(true);
          throw new Error('Something went wrong');
        }
        const result = await response.json();

        setData(result)
        setIsLoading(false);
      } catch(error) {
        setIsError(true);
        setIsLoading(false);
      }
    }
    getProductData();
  }, [])

  return (
    <div className={clsx(styles.order, 'pb-30')}>
      {!isLoading && !isError && (
        <>
          <p className={clsx(styles.number, "text text_type_digits-large pb-8")}>{data.order.number}</p>
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
        </>
      )}
      {isLoading && (
        <div className="m-30">
          <p className="mb-20 text text_color_inactive text_type_main-medium">Подсчитываем стоимость и формируем заказ</p>
          <Loader />
        </div>
      )}
      {isError && <p className="m-30 text text_color_inactive text_type_main-medium">На наших межгалактических серверах что-то пошло не так :( но мы уже транспортировались для исправления ошибок</p>}
    </div>
  )
}

export default OrderDetails;
