import styles from './ingredient-details.module.css';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const detailsPropTypes = PropTypes.shape({
  image_large: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
});

const IngredientDetails = (props) => {
  const { details } = props;
  console.log('details', details)

  const textDefaultClass = "text text_type_main-default text_color_inactive";
  const textMeduimClass = "text text_type_main-medium text_color_inactive";
  return (
    <div className={clsx(styles.modal, 'pl-10 pr-10 pt-10 pb-15')}>
      <img style={{ width: '480px', height: '240px', backgroundImage: `url(${details.image_large})` }} alt={details.name}/>
      <p className="text text_type_main-medium mt-4 mb-8">{details.name}</p>
      <div className={styles.details}>
        <p className={clsx(styles.text, textDefaultClass)}>Калории, ккал<strong className={clsx(textMeduimClass, "mt-2")}>{details.calories}</strong></p>
        <p className={clsx(styles.text, textDefaultClass)}>Белки, г<strong className={clsx(textMeduimClass, "mt-2")}>{details.proteins}</strong></p>
        <p className={clsx(styles.text, textDefaultClass)}>Жиры, г<strong className={clsx(textMeduimClass, "mt-2")}>{details.fat}</strong></p>
        <p className={clsx(styles.text, textDefaultClass)}>Углеводы, г<strong className={clsx(textMeduimClass, "mt-2")}>{details.carbohydrates}</strong></p>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  details: detailsPropTypes.isRequired,
};

export default IngredientDetails;
