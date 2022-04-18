import {
  Tab
} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./burger-ingredients.module.css";

import { CLOSE_DETAILS, SHOW_DETAILS, getDetails } from "../../services/actions/index";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Ingredient from "../ingredient/ingredient";
import Modal from "../modal/modal";

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const { items } = useSelector(state => state.items);
  const details = useSelector((state) => state.itemDetails.details);
  const showDetails = useSelector(state => state.itemDetails.showDetails);

  const buns = items.filter(elem => elem.type === "bun");
  const sauces = items.filter(elem => elem.type === "sauce");
  const mains = items.filter(elem => elem.type === "main");

  function handleOpenModal(elem) {
    dispatch(getDetails(elem));
    dispatch({ type: SHOW_DETAILS });
  }

  function handleCloseModal() {
    dispatch({ type: CLOSE_DETAILS });
  }

  const [current, setCurrent] = React.useState("one");

  function scrollToBlock(e) {
    const elem = e.target;
    if (elem.scrollTop > 0 && elem.scrollTop < 294) {
      setCurrent("one");
    } else if (elem.scrollTop > 294 && elem.scrollTop < 820) {
      setCurrent("two");
    } else if (elem.scrollTop > 820) {
      setCurrent("three");
    }
  }

  return (
    <section className={ styles.box }>
      { showDetails &&
        <Modal onClose={ handleCloseModal } header='Детали ингредиента'>
          <IngredientDetails details={ details } />
        </Modal>
      }
      <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
      <div className={ styles.tab }>
        <Tab value='one' active={ current === "one" } onClick={ setCurrent }>
          Булки
        </Tab>
        <Tab value='two' active={ current === "two" } onClick={ setCurrent }>
          Соусы
        </Tab>
        <Tab value='three' active={ current === "three" } onClick={ setCurrent }>
          Начинки
        </Tab>
      </div>
      <div className={ styles.ingridients } onScroll={ scrollToBlock }>

        <p className='text text_type_main-medium pt-10 pb-6'>Булки</p>
        <div className={ clsx(styles.items, "pl-4 pr-4") }>
          { Object.values(buns).map(elem => <Ingredient
            elem={ elem }
            key={ elem._id }
            handleOpenModal={ handleOpenModal }
          />) }
        </div>

        <p className='text text_type_main-medium mt-10 pb-6'>Соусы</p>
        <div className={ clsx(styles.items, "pl-4 pr-4") }>
          { Object.values(sauces).map(elem => <Ingredient
            elem={ elem }
            key={ elem._id }
            handleOpenModal={ handleOpenModal }
          />) }
        </div>

        <p className='text text_type_main-medium mt-10 pb-6'>Начинки</p>
        <div className={ clsx(styles.items, "pl-4 pr-4") }>
          { Object.values(mains).map(elem => <Ingredient
            elem={ elem }
            key={ elem._id }
            handleOpenModal={ handleOpenModal }
          />) }
        </div>

      </div>

    </section>
  );
};

export default BurgerIngredients;
