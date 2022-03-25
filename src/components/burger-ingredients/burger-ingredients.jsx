import React from 'react';
import styles from './burger-ingredients.module.css';
import clsx from 'clsx';

import {
  Tab,
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerPropTypes from '../../utils/types';

import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details';

const BurgerIngredients = (props) => {
  const buns = props.details.filter(elem => elem.type === 'bun');
  const sauces = props.details.filter(elem => elem.type === 'sauce');
  const mains = props.details.filter(elem => elem.type === 'main');

  const [visibleDetails, setVisibleDetails] = React.useState(false);
  const [ingredientDetails, setIngredientDetails] = React.useState({});

  function handleOpenModal(elem) {
    setIngredientDetails(elem);
    setVisibleDetails(true);
  }

  function handleCloseModal() {
    setVisibleDetails(false);
  }

  const ids = ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733ce', '60d3b41abdacab0026a733cb', '60d3b41abdacab0026a733d0', '60d3b41abdacab0026a733d3', '60d3b41abdacab0026a733d4']

  const [current, setCurrent] = React.useState('one');
    return (
      <section className={styles.box}>
        {visibleDetails &&
          <Modal onClose={handleCloseModal} header="Детали ингредиента">
            <IngredientDetails details={ingredientDetails} />
          </Modal>
        }
        <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
        <div className={styles.tab}>
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={styles.ingridients}>

          <p className="text text_type_main-medium pt-10 pb-6">Булки</p>
          <div className={clsx(styles.items, "pl-4 pr-4")}>
            {Object.values(buns).map(elem => {
              return (<div className={styles.item} key={elem._id} onClick={e => {handleOpenModal(elem)}}>
                <img src={elem.image} className={styles.image} alt={elem.name} />
                <div className={clsx(styles.priceBox, "price pt-1 pb-1")}>
                  <p className="text text_type_digits-default pr-2">{elem.price}</p>
                  <div className={styles.icon}>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
                <p className={clsx(styles.name, "text text_type_main-default")}>{elem.name}</p>
                {ids.includes(elem._id) && <Counter count={2} size="default" />}
              </div>
            )})}
          </div>

          <p className="text text_type_main-medium mt-10 pb-6">Соусы</p>
          <div className={clsx(styles.items, "pl-4 pr-4")}>
            {Object.values(sauces).map(elem => {
              return (<div className={clsx(styles.item, "mb-8")} key={elem._id} onClick={e => {handleOpenModal(elem)}}>
                <img src={elem.image} className={styles.image} alt={elem.name} />
                <div className={clsx(styles.priceBox, "price pt-1 pb-1")}>
                  <p className="text text_type_digits-default pr-2">{elem.price}</p>
                  <div className={styles.icon}>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
                <p className={clsx(styles.name, "text text_type_main-default")}>{elem.name}</p>
                {ids.includes(elem._id) && <Counter count={1} size="default" />}
              </div>
            )})}
          </div>

          <p className="text text_type_main-medium mt-10 pb-6">Начинки</p>
          <div className={clsx(styles.items, "pl-4 pr-4")}>
            {Object.values(mains).map(elem => {
              return (<div className={clsx(styles.item, "mb-8")} key={elem._id} onClick={e => {handleOpenModal(elem)}}>
                <img src={elem.image} className={styles.image} alt={elem.name} />
                <div className={clsx(styles.priceBox, "price pt-1 pb-1")}>
                  <p className="text text_type_digits-default pr-2">{elem.price}</p>
                  <div className={styles.icon}>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
                <p className={clsx(styles.name, "text text_type_main-default")}>{elem.name}</p>
                {ids.includes(elem._id) && <Counter count={1} size="default" />}
              </div>
            )})}
          </div>

        </div>

      </section>
    );
}

BurgerIngredients.propTypes = {
  details: burgerPropTypes.isRequired,
};

export default BurgerIngredients;
