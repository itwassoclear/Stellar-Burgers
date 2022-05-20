import { FC } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import styles from "./ingredient.module.css";
import { TRootState } from "../../services/reducers";
import { TElement } from "../../utils/types";

type TIngredientProps = {
  readonly elem: TElement;
  readonly handleOpenModal: (elem: TElement) => void;
};

const Ingredient: FC<TIngredientProps> = ({ elem, handleOpenModal }) => {
  const { _id, name, price, image, type } = elem;
  const ingredients = useSelector(
    (store: TRootState) => store.constructorItems.ingredients
  );
  const bun = useSelector((store: TRootState) => store.constructorItems.bun);
  const allItems = [bun, bun, ...ingredients];
  const amount = allItems.filter((item) => item?._id === _id).length;

  const [{ opacity }, dragRef] = useDrag({
    type: type,
    item: { _id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div
      className={clsx(styles.item, "mb-8")}
      id={_id}
      ref={dragRef}
      style={{ opacity }}
      key={_id}
      onClick={() => handleOpenModal(elem)}
    >
      <img src={image} className={styles.image} alt={name} />
      <div className={clsx(styles.priceBox, "price pt-1 pb-1")}>
        <p className='text text_type_digits-default pr-2'>{price}</p>
        <div className={styles.icon}>
          <CurrencyIcon type='primary' />
        </div>
      </div>
      <p className={clsx(styles.name, "text text_type_main-default")}>{name}</p>
      {amount > 0 && <Counter count={amount} size='default' />}
    </div>
  );
};

export default Ingredient;
