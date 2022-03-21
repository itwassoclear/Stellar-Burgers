import styles from './burger-constructor.module.css';
import clsx from 'clsx';

import {
  DragIcon,
  CurrencyIcon,
  DeleteIcon,
  LockIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerPropTypes from '../../utils/types';

const BurgerConstructor = (props) => {

  const ids = ['60666c42cc7b410027a1a9b1', '60666c42cc7b410027a1a9b9', '60666c42cc7b410027a1a9b4', '60666c42cc7b410027a1a9bc', '60666c42cc7b410027a1a9bb', '60666c42cc7b410027a1a9bb']
  const ingredients = []
  props.details.forEach(el => {
    ids.forEach(elem => {
      if (el._id === elem) {
        if (el._id === '60666c42cc7b410027a1a9b1') {
          el.style = '(верх)'
        }
        ingredients.push(el)
      }
    })
  })

  const bottomBun = props.details.filter(elem => elem._id === '60666c42cc7b410027a1a9b1')
  const totalPrice = ingredients.reduce((cur, acc) => acc.price + cur, 0)

  return (
      <section className={clsx(styles.box, "ml-10 mt-25 pt-4 pr-4 pl-4")}>
        <div>
          {ingredients.map(elem => {
            return (<div className={clsx(styles.ingridient, "ml-8 pl-6 pr-8 pt-4 pb-4 mb-4")} key={Math.random()}>
              {elem.type !== 'bun' && (<div className={styles.dragIcon}>
                <DragIcon type="primary" />
              </div>)}
              <img src={elem.image_mobile} className={clsx(styles.image, "mr-5")} alt="Изображение ингридиента" />
              <p className={clsx(styles.name, "text text_type_main-default mr-5")}>{elem.name} {elem.style}</p>
              <div className={clsx(styles.priceBox, "price pt-1 pb-1 ml-5 mr-5")}>
                <p className="text text_type_digits-default pr-2">{elem.price}</p>
                <CurrencyIcon type="primary" />
              </div>
              {elem.type !== 'bun' ? <DeleteIcon type="primary" /> : <LockIcon type="secondary" />}
            </div>
          )})}
          <div className={clsx(styles.ingridient, "ml-8 pl-6 pr-8 pt-4 pb-4 mb-4")} key={Math.random()}>
            <img src={bottomBun[0].image_mobile} className={clsx(styles.image, "mr-5")} alt="Изображение ингридиента" />
            <p className={clsx(styles.name, "text text_type_main-default mr-5")}>{bottomBun[0].name} (низ)</p>
            <div className={clsx(styles.priceBox, "price pt-1 pb-1 ml-5 mr-5")}>
              <p className="text text_type_digits-default pr-2">{bottomBun[0].price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <LockIcon type="secondary" />
          </div>
        </div>

        <div className={clsx(styles.totalBox, "mt-10")}>
          <div className={clsx(styles.total, "price pt-1 pb-1 mr-10")}>
            <p className="text text_type_digits-medium pr-2">{totalPrice + bottomBun[0].price}</p>
            <div className={styles.resultIcon}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
          <Button type="primary" size="medium">Оформить заказ</Button>
        </div>
      </section>
    );
}

BurgerConstructor.propTypes = {
  details: burgerPropTypes.isRequired,
};

export default BurgerConstructor
