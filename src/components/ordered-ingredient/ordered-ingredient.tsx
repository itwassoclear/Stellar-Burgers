import { BaseSyntheticEvent, FC } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "../../services/types/index";
import styles from "./ordered-ingredient.module.css";

import { DELETE_INGREDIENT } from "../../services/actions/constructor";
import { TElement } from "../../services/types/data";

type TItemPropTypes = {
  _id: string;
  dragId: string;
  payload: TElement;
};

type TOrderedIngredient = {
  item: TItemPropTypes;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};

type TClientOffset = {
  x: number;
  y: number;
};

type TDragItem = {
  index: number;
  id: string;
  type: string;
};

const OrderedIngredient: FC<TOrderedIngredient> = ({
  item,
  index,
  moveCard,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const ingredient = item.payload;

  const [, drop] = useDrop({
    accept: "item",
    hover(item: TDragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset() as TClientOffset;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const opacity = isDragging ? 0.5 : 1;
  const preventDefault = (e: BaseSyntheticEvent) => e.preventDefault();

  const deleteItem = () => {
    const id = ingredient._id;
    dispatch({
      type: DELETE_INGREDIENT,
      index,
      id,
    });
  };

  return (
    <div
      className={clsx(styles.ingredient, styles.wrapper)}
      key={ingredient._id}
      ref={ref}
      style={{ opacity }}
      onDrop={preventDefault}
    >
      <div className={styles.dragIcon}>
        <DragIcon type='primary' />
      </div>
      <div className={styles.ingredientDetails}>
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
          handleClose={() => deleteItem()}
        />
      </div>
    </div>
  );
};

export default OrderedIngredient;
