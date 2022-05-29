import { useCallback, FC } from "react";
import { useDispatch } from "react-redux";
import { MOVE_INGREDIENT } from "../../services/actions/constructor";

import OrderedIngredient from "../ordered-ingredient/ordered-ingredient";
import { TElement as TElementDetails } from "../../utils/types";

type TElement = {
  _id: string;
  dragId: string;
  payload: TElementDetails;
};

type TIngredientProps = {
  ingredients: TElement[];
};

const ConstructorIngredientsList: FC<TIngredientProps> = ({ ingredients }) => {
  const dispatch = useDispatch();
  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = ingredients[dragIndex];
      const newCards = [...ingredients];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      dispatch({
        type: MOVE_INGREDIENT,
        optional: newCards,
      });
    },
    [ingredients, dispatch]
  );

  return (
    <>
      {ingredients.map((item: TElement, index: number) => (
        <OrderedIngredient
          key={item.dragId}
          index={index}
          item={item}
          moveCard={moveCard}
        />
      ))}
    </>
  );
};

export default ConstructorIngredientsList;
