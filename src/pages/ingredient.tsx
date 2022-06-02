import { useSelector } from "../services/types/index";
import { useHistory } from "react-router-dom";

import styles from "./pages.module.css";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

import { TIngredients } from "../services/types/data";

export function IngredientPage() {
  const items = useSelector((store) => store.items.items);
  const history = useHistory();
  const id = history.location.pathname.replace("/ingredients/", "");

  return (
    <div className={styles.wrapper}>
      {items && (
        <IngredientDetails
          details={items.filter((el: TIngredients) => el._id === id)[0]}
        />
      )}
    </div>
  );
}
