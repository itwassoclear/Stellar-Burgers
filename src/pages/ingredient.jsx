import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./ingredient.module.css";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

export function IngredientPage() {
  const items = useSelector((store) => store.items.items);
  const history = useHistory();
  const id = history.location.pathname.replace("/ingredients/", "");

  return (
    <div className={styles.wrapper}>
      {items && (
        <IngredientDetails details={items.filter((el) => el._id === id)[0]} />
      )}
    </div>
  );
}
