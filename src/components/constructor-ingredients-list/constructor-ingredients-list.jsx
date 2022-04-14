import { useCallback } from 'react';
import { useDispatch } from "react-redux";
import OrderedIngredient from '../ordered-ingredient/ordered-ingredient';
import { MOVE_INGREDIENT } from '../../services/actions/index';

import { ingredientPropTypes } from '../../utils/types';

export default function ConstructorIngredientsList({ ingredients }) {
  const dispatch = useDispatch();
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = ingredients[dragIndex];
    const newCards = [...ingredients]
    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)


    dispatch({
      type: MOVE_INGREDIENT,
      optional: newCards,
    })
  }, [ingredients, dispatch]);

  return (
    ingredients.map((item, index) => (
      <OrderedIngredient key={item.dragId} index={index} item={item} moveCard={moveCard} />
    ))
  )
}

ConstructorIngredientsList.propTypes = {
  ingredients: ingredientPropTypes.isRequired,
};
