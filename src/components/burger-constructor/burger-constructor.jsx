import React, { useContext, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import clsx from 'clsx';

import {
  DragIcon,
  CurrencyIcon,
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details';
import { BurgerContext } from '../../utils/burger-context';

const BurgerConstructor = () => {
  const data = useContext(BurgerContext);
  const [visibleOrder, setVisibleOrder] = React.useState(false);

  function handleOpenModal() {
    setVisibleOrder(true);
  }

  function handleCloseModal() {
    setVisibleOrder(false);
  }

  const ingredients = data.filter(el => el.type !== 'bun');

  const bun = data.filter(elem => elem.type === 'bun');
  const totalPrice = useMemo(
    () => ingredients.reduce((cur, acc) => acc.price + cur, 0) + (bun[0].price * 2),
    [ingredients, bun]
  );

  return (
    <section className={clsx(styles.box, "ml-10 mt-25 pt-4 pr-4 pl-4")}>
      {visibleOrder &&
          <Modal onClose={handleCloseModal}>
            <OrderDetails />
          </Modal>
      }
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className='ml-8'>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun[0].name} (верх)`}
          price={bun[0].price}
          thumbnail={bun[0].image_mobile}
        />
        {ingredients.map(elem => {
          return (
            <div className={styles.ingredient} key={elem._id}>
              <div className={styles.dragIcon}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text={elem.name}
                price={elem.price}
                thumbnail={elem.image_mobile}
              />
            </div>

          )})
        }
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun[0].name} (низ)`}
          price={bun[0].price}
          thumbnail={bun[0].image_mobile}
        />
      </div>

        <div className={clsx(styles.totalBox, "mt-10")}>
          <div className={clsx(styles.total, "price pt-1 pb-1 mr-10")}>
            <p className="text text_type_digits-medium pr-2">{totalPrice}</p>
            <div className={styles.resultIcon}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
          <Button type="primary" size="medium" onClick={handleOpenModal}>Оформить заказ</Button>
        </div>
      </section>
    );
}

export default BurgerConstructor
