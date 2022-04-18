import PropTypes from "prop-types";

export const burgerPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
});

export const detailsPropTypes = PropTypes.shape({
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image_large: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired
});

export const itemPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  dragId: PropTypes.string.isRequired,
  payload: detailsPropTypes.isRequired
});

export const ingredientPropTypes = PropTypes.arrayOf(itemPropTypes);
