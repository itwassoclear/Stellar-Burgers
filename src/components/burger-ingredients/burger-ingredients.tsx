import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/types/index";
import { Location } from "history";
import styles from "./burger-ingredients.module.css";

import {
  CLOSE_DETAILS,
  SHOW_DETAILS,
  getDetails,
} from "../../services/actions/details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Ingredient from "../ingredient/ingredient";
import Modal from "../modal/modal";
import { TIngredients } from "../../services/types/data";

type TLocationState = {
  main?: Location<TLocationState>;
  from?: { pathname: string };
};

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const location = useLocation<TLocationState>();
  const history = useHistory();

  const { items } = useSelector((store) => store.items);
  const details = useSelector((store) => store.itemDetails.details);
  const showDetails = useSelector((store) => store.itemDetails.showDetails);

  const buns = items.filter((elem: TIngredients) => elem.type === "bun");
  const sauces = items.filter((elem: TIngredients) => elem.type === "sauce");
  const mains = items.filter((elem: TIngredients) => elem.type === "main");

  function handleOpenModal(elem: TIngredients) {
    dispatch(getDetails(elem));
    dispatch({ type: SHOW_DETAILS });
  }

  function handleCloseModal() {
    dispatch({ type: CLOSE_DETAILS });
    history.goBack();
  }

  const [current, setCurrent] = useState<string>("one");

  function scrollToBlock(e: any) {
    const elem = e.target;
    if (elem.scrollTop > 0 && elem.scrollTop < 292) {
      setCurrent("one");
    } else if (elem.scrollTop > 292 && elem.scrollTop < 819) {
      setCurrent("two");
    } else if (elem.scrollTop > 819) {
      setCurrent("three");
    }
  }

  const tab1 = React.useRef(null);
  const tab2 = React.useRef(null);
  const tab3 = React.useRef(null);

  const executeScroll = (e: React.SetStateAction<string>): void => {
    setCurrent(e);
    let ref: any = null;
    switch (e) {
      case "one":
        ref = tab1;
        break;
      case "two":
        ref = tab2;
        break;
      case "three":
        ref = tab3;
        break;

      default:
        break;
    }
    ref.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <section className={styles.box} id='box'>
      {showDetails && (
        <Modal onClose={handleCloseModal} header='Детали ингредиента'>
          <IngredientDetails details={details} />
        </Modal>
      )}
      <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
      <div className={styles.tab}>
        <Tab
          value='one'
          active={current === "one"}
          onClick={(e) => executeScroll(e)}
        >
          Булки
        </Tab>
        <Tab
          value='two'
          active={current === "two"}
          onClick={(e) => executeScroll(e)}
        >
          Соусы
        </Tab>
        <Tab
          value='three'
          active={current === "three"}
          onClick={(e) => executeScroll(e)}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.ingridients} onScroll={scrollToBlock}>
        <p className='text text_type_main-medium pt-10 pb-6' ref={tab1}>
          Булки
        </p>
        <div className={clsx(styles.items, "pl-4 pr-4")}>
          {buns.map((elem: TIngredients) => (
            <Link
              key={elem._id}
              to={{
                pathname: `ingredients/${elem._id}`,
                state: { main: location },
              }}
              className={styles.link}
            >
              <Ingredient elem={elem} handleOpenModal={handleOpenModal} />
            </Link>
          ))}
        </div>

        <p className='text text_type_main-medium pt-10 pb-6' ref={tab2}>
          Соусы
        </p>
        <div className={clsx(styles.items, "pl-4 pr-4")}>
          {sauces.map((elem: TIngredients) => (
            <Link
              key={elem._id}
              to={{
                pathname: `ingredients/${elem._id}`,
                state: { main: location },
              }}
              className={styles.link}
            >
              <Ingredient elem={elem} handleOpenModal={handleOpenModal} />
            </Link>
          ))}
        </div>

        <p className='text text_type_main-medium pt-10 pb-6' ref={tab3}>
          Начинки
        </p>
        <div className={clsx(styles.items, "pl-4 pr-4")}>
          {mains.map((elem: TIngredients) => (
            <Link
              key={elem._id}
              to={{
                pathname: `ingredients/${elem._id}`,
                state: { main: location },
              }}
              className={styles.link}
            >
              <Ingredient elem={elem} handleOpenModal={handleOpenModal} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
