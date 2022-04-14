import styles from './ingredient-details.module.css';
import clsx from 'clsx';
import { detailsPropTypes } from '../../utils/types';

const IngredientDetails = ({ details }) => {
  const image = details.image_large;
  const textDefaultClass = "text text_type_main-default text_color_inactive";
  const textMeduimClass = "text text_type_main-medium text_color_inactive";

  return (
    <div className={clsx(styles.modal, 'pl-10 pr-10 pt-10 pb-15')}>
      <img className={styles.image} alt={details.name} src={image} decoding="sync" />
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
