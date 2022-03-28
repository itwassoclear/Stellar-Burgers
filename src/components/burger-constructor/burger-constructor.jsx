import React from 'react';
import styles from './burger-constructor.module.css';
import clsx from 'clsx';

import {
  DragIcon,
  CurrencyIcon,
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerPropTypes } from '../../utils/types';
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details';

const BurgerConstructor = (props) => {
  const [visibleOrder, setVisibleOrder] = React.useState(false);

  function handleOpenModal() {
    setVisibleOrder(true)
  }

  function handleCloseModal() {
    setVisibleOrder(false)
  }

  const ids = ['60d3b41abdacab0026a733ce', '60d3b41abdacab0026a733cb', '60d3b41abdacab0026a733d0', '60d3b41abdacab0026a733d3', '60d3b41abdacab0026a733d4']
  const ingredients = []
  props.details.forEach(el => {
    ids.forEach(elem => {
      if (el._id === elem) {
        ingredients.push(el)
      }
    })
  })

  const bottomBun = props.details.filter(elem => elem._id === '60d3b41abdacab0026a733c6')
  const totalPrice = ingredients.reduce((cur, acc) => acc.price + cur, 0)

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
          text={`${bottomBun[0].name} (верх)`}
          price={bottomBun[0].price}
          thumbnail={bottomBun[0].image_mobile}
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
          text={`${bottomBun[0].name} (низ)`}
          price={bottomBun[0].price}
          thumbnail={bottomBun[0].image_mobile}
        />
      </div>

        <div className={clsx(styles.totalBox, "mt-10")}>
          <div className={clsx(styles.total, "price pt-1 pb-1 mr-10")}>
            <p className="text text_type_digits-medium pr-2">{totalPrice + bottomBun[0].price}</p>
            <div className={styles.resultIcon}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
          <Button type="primary" size="medium" onClick={handleOpenModal}>Оформить заказ</Button>
        </div>
      </section>
    );
}

BurgerConstructor.propTypes = {
  details: burgerPropTypes.isRequired,
};

export default BurgerConstructor
