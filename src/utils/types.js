import PropTypes from 'prop-types';

export const burgerPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

export const detailsPropTypes = PropTypes.shape({
  image_large: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
});

export const itemPropTypes = PropTypes.shape({
  dragId: PropTypes.string.isRequired,
  payload: detailsPropTypes.isRequired,
  _id: PropTypes.string.isRequired,
});

export const ingredientPropTypes = PropTypes.arrayOf(itemPropTypes);
