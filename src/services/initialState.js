export const initialState = {
  items: null, // список всех полученных от сервера ингредиентов
  itemsRequest: false,
  itemsFailed: false,

  bun: null,
  ingredients: [], // список всех ингредиентов в текущем конструкторе бургера
  totalPrice: 0,

  details: null, // объект текущего просматриваемого ингредиента
  showDetails: false,

  order: null, // объект созданного заказа
  orderRequest: false,
  orderFailed: false,
  showOrder: false,
};
