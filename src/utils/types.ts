export type TElement = {
  type: "bun" | "sauce" | "main";
  _id: string;
  _v: number;
  name: string;
  image: string;
  image_large: string;
  image_mobile: string;
  price: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
};

export type TIngredientDetails = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image_large: string;
  name: string;
  proteins: number;
};

export type TLocationState = {
  main: {
    pathname: string;
    state: {};
    search: string;
    hash: string;
  };
};

export type TOrder = {
  name: string;
  order: { number: number };
  success: boolean;
};

export type TProfileMenu = {
  activeLink: string;
};
