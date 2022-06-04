import { FC } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import { useMemo } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { useSelector, useDispatch } from "../../services/types/index";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import styles from "./burger-constructor.module.css";

import {
  SHOW_ORDER,
  CLOSE_ORDER,
  getOrder,
} from "../../services/actions/order";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  RESET,
} from "../../services/actions/constructor";
import ConstructorIngredientsList from "../constructor-ingredients-list/constructor-ingredients-list";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { TIngredients } from "../../services/types/data";

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isUser = useSelector((state) => state.user.isUser);
  const { bun, ingredients } = useSelector((state) => state.constructorItems);
  const showOrder = useSelector((state) => state.orderDetails.showOrder);
  const order = useSelector((state) => state.orderDetails.order);
  const storeItems = useSelector((state) => state.items.items);
  const types = ["sauce", "main"];

  function handleOpenModal() {
    if (isUser) {
      const itemsForOrder: string[] = ingredients.map((item) => item._id);
      itemsForOrder.unshift(bun?._id as string);
      itemsForOrder.push(bun?._id as string);
      dispatch(getOrder(itemsForOrder));
      dispatch({ type: SHOW_ORDER });
    } else {
      history.replace({ pathname: "/login" });
    }
  }

  function handleCloseModal() {
    dispatch({ type: CLOSE_ORDER });
    dispatch({ type: RESET });
  }

  const [{ isHoverBun }, drop] = useDrop({
    accept: "bun",
    collect: (monitor: DropTargetMonitor) => ({
      isHoverBun: monitor.isOver(),
    }),
    drop(item: { _id: string }) {
      dispatch({
        type: ADD_BUN,
        item: {
          ...item,
          payload: storeItems.find((el: TIngredients) => el._id === item._id),
          dragId: uuid(),
        },
      });
    },
  });

  const [{ isHover }, dropTargerRef] = useDrop({
    accept: types,
    collect: (monitor: DropTargetMonitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item: { _id: string }) {
      dispatch({
        type: ADD_INGREDIENT,
        item: {
          ...item,
          payload: storeItems.find((el: TIngredients) => el._id === item._id),
          dragId: uuid(),
        },
      });
    },
  });

  const border: string =
    isHover || isHoverBun ? "0px 0px 0px 4px #4C4CFF" : "none";

  const totalPrice = useMemo(() => {
    let itemsPrice =
      ingredients.length > 0
        ? ingredients.reduce(
            (cur: number, acc: any) => acc.payload.price + cur,
            0
          )
        : 0;
    let bunPrice = bun ? bun.payload.price * 2 : 0;
    return itemsPrice + bunPrice;
  }, [ingredients, bun]);

  const disabledButton = !bun;

  return (
    <section
      className={clsx(
        styles.box,
        isHover ? styles.onHover : "",
        "ml-10 mt-25 pt-4 pr-4 pl-4"
      )}
    >
      {showOrder && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails order={order} />
        </Modal>
      )}

      <div
        className={clsx(styles.buns, "ml-8")}
        style={{ boxShadow: border }}
        ref={drop}
      >
        {bun ? (
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${bun.payload.name} (верх)`}
            price={bun.payload.price}
            thumbnail={bun.payload.image_mobile}
          />
        ) : (
          <div className='m-20'>
            <p
              className={clsx("text text_color_inactive text_type_main-medium")}
            >
              Перетащи сюда булку
            </p>
          </div>
        )}
      </div>

      <div
        className={clsx(styles.items, "ml-8")}
        style={{ boxShadow: border }}
        ref={dropTargerRef}
      >
        {ingredients.length > 0 ? (
          <ConstructorIngredientsList ingredients={ingredients} />
        ) : (
          <div className='m-20'>
            <p
              className={clsx(
                styles.emptyItems,
                "text text_color_inactive text_type_main-medium"
              )}
            >
              Пока здесь пусто. Перетаскивай сюда игредиенты
            </p>
          </div>
        )}
      </div>

      {bun && (
        <div style={{ marginTop: "10px" }} className='ml-8'>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${bun.payload.name} (низ)`}
            price={bun.payload.price}
            thumbnail={bun.payload.image_mobile}
          />
        </div>
      )}

      <div className={clsx(styles.totalBox, "mt-10")}>
        <div className={clsx(styles.total, "price pt-1 pb-1 mr-10")}>
          <p className='text text_type_digits-medium pr-2'>{totalPrice}</p>
          <div className={styles.resultIcon}>
            <CurrencyIcon type='primary' />
          </div>
        </div>
        <Button
          type='primary'
          size='medium'
          onClick={handleOpenModal}
          disabled={disabledButton}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
