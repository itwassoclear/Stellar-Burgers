import PropTypes from 'prop-types';

const burgerPropTypes = PropTypes.arrayOf(PropTypes.shape({
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}));

export default burgerPropTypes
