import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./main.module.css";

import Loader from "../components/loader/loader";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";

import { TElement } from "../utils/types";

type TItems = {
  items: { [key: string]: TElement };
};

export const MainPage: FC<TItems> = ({ items }) => {
  return (
    <section className={styles.appSection}>
      {items ? (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      ) : (
        <div className='m-30'>
          <p className='mb-20 text text_color_inactive text_type_main-medium'>
            Подгружаем для вас самые свежие ингредиенты
          </p>
          <Loader />
        </div>
      )}
    </section>
  );
};
