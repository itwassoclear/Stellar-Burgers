import { TIngredients } from "../types/data";

export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const MOVE_INGREDIENT: "MOVE_INGREDIENT" = "MOVE_INGREDIENT";
export const CALC_PRICE: "CALC_PRICE" = "CALC_PRICE";
export const RESET: "RESET" = "RESET";

interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  index: number;
  item: TIngredients;
  optional: TIngredients[];
}

interface IAddItemAction {
  readonly type: typeof ADD_INGREDIENT;
  index: number;
  item: TIngredients;
  optional: TIngredients[];
}

interface IDeleteItemAction {
  readonly type: typeof DELETE_INGREDIENT;
  index: number;
  item: TIngredients;
  optional: TIngredients[];
}

interface IMoveIngredientAction {
  readonly type: typeof MOVE_INGREDIENT;
  item: TIngredients;
  index: number;
  optional: TIngredients[];
}

interface ICalcPriceIdAction {
  readonly type: typeof CALC_PRICE;
  item: TIngredients;
  index: number;
  optional: TIngredients[];
}

interface IResetConstructorAction {
  readonly type: typeof RESET;
  item: TIngredients;
  index: number;
  optional: TIngredients[];
}

export type TConstructorActions =
  | IAddBunAction
  | IAddItemAction
  | IDeleteItemAction
  | IMoveIngredientAction
  | ICalcPriceIdAction
  | IResetConstructorAction;
