const login = {
  success: true,
  accessToken:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjZiZjQ1ZmE3NDdlMDAxYmQ0NDMzNSIsImlhdCI6MTY1NTM4MTI0NiwiZXhwIjoxNjU1MzgyNDQ2fQ.QhvBFUa6KeAjyWnX2BX2LqwnUE42jD68BRlLZp0mzBk",
  refreshToken:
    "d513ed1f548aa9b4e4901178b788563a31f9dc357f6c5c15cf288e40cec47bf5baf6f0028ee3ed95",
  user: {
    email: "itwassoclear@gmail.com",
    name: "машa",
  },
};

const totalPrice = 3588;

const order = {
  name: "Астероидный минеральный бессмертный space краторный бургер",

  order: {
    ingredients: [
      {
        _id: "62ab35bcfa747e001bd52b38",
        createdAt: "2022-06-16T13:53:00.193Z",
        ingredients: [
          {
            __v: 0,
            _id: "60d3b41abdacab0026a733c6",
            calories: 420,
            carbohydrates: 53,
            fat: 24,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_large:
              "https://code.s3.yandex.net/react/code/bun-02-large.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            name: "Краторная булка N-200i",
            price: 1255,
            proteins: 80,
            type: "bun",
          },
          {
            __v: 0,
            _id: "60d3b41abdacab0026a733cd",
            calories: 14,
            carbohydrates: 11,
            fat: 22,
            image: "https://code.s3.yandex.net/react/code/sauce-04.png",
            image_large:
              "https://code.s3.yandex.net/react/code/sauce-04-large.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
            name: "Соус фирменный Space Sauce",
            price: 80,
            proteins: 50,
            type: "sauce",
          },
          {
            __v: 0,
            _id: "60d3b41abdacab0026a733c9",
            calories: 420,
            carbohydrates: 33,
            fat: 244,
            image: "https://code.s3.yandex.net/react/code/meat-02.png",
            image_large:
              "https://code.s3.yandex.net/react/code/meat-02-large.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            name: "Мясо бессмертных моллюсков Protostomia",
            price: 1337,
            proteins: 433,
            type: "main",
          },
          {
            __v: 0,
            _id: "60d3b41abdacab0026a733d0",
            calories: 986,
            carbohydrates: 609,
            fat: 689,
            image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
            image_large:
              "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
            name: "Хрустящие минеральные кольца",
            price: 300,
            proteins: 808,
            type: "main",
          },
          {
            __v: 0,
            _id: "60d3b41abdacab0026a733d4",
            calories: 3377,
            carbohydrates: 420,
            fat: 48,
            image: "https://code.s3.yandex.net/react/code/cheese.png",
            image_large:
              "https://code.s3.yandex.net/react/code/cheese-large.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/cheese-mobile.png",
            name: "Сыр с астероидной плесенью",
            price: 4142,
            proteins: 84,
            type: "main",
          },
          {
            __v: 0,
            _id: "60d3b41abdacab0026a733c6",
            calories: 420,
            carbohydrates: 53,
            fat: 24,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_large:
              "https://code.s3.yandex.net/react/code/bun-02-large.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            name: "Краторная булка N-200i",
            price: 1255,
            proteins: 80,
            type: "bun",
          },
        ],
        name: "Астероидный минеральный бессмертный space краторный бургер",
        number: 17872,
        owner: {
          name: "машa",
          email: "itwassoclear@gmail.com",
          createdAt: "2022-04-25T15:33:25.183Z",
          updatedAt: "2022-05-28T15:05:56.740Z",
        },
        price: 8369,
        status: "done",
        updatedAt: "2022-06-16T13:53:00.680Z",
      },
    ],
  },
  success: true,
};

describe("app works correctly with routes and login", function () {
  before(function () {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name^="email"]').type("itwassoclear@gmail.com");
    cy.get('input[name^="password"]').type("ghghgh");
    cy.get("button").contains("Войти").click();
    cy.intercept(
      "POST",
      "https://norma.nomoreparties.space/api/auth/login",
      login
    );
  });

  it("render Main page with burger constructor", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Конструктор");
    cy.contains("Лента заказов");
    cy.contains("Личный кабинет");
    cy.contains("Соберите бургер");
    cy.contains("Булки");
    cy.contains("Соусы");
    cy.contains("Начинки");
    cy.get("[class^=button_button__]")
      .contains("Оформить заказ")
      .should("be.disabled");
  });
});

describe("modal windows with ingredient details work correctly", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("should open modal window with ingredient details", function () {
    cy.get('*[class^="burger-ingredients_link"]').first().click();
    cy.contains("Детали ингредиента");
  });

  it("should close modal window with ingredient details", function () {
    cy.get("[class^=modal_closeIcon__]").first().click();
    cy.contains("Детали ингредиента").should("not.exist");
  });
});

describe("scroll into selected type of ingredient", function () {
  it("should scroll into sauce", function () {
    cy.get("[class^=tab_tab__]").eq(1).click();
    cy.get("p").contains("Соусы").scrollIntoView().should("be.visible");
  });

  it("should scroll into filling", function () {
    cy.get("[class^=tab_tab__]").eq(2).click();
    cy.get("p").contains("Начинки").scrollIntoView().should("be.visible");
  });

  it("should scroll into buns", function () {
    cy.get("[class^=tab_tab__]").eq(0).click();
    cy.get("p").contains("Булки").scrollIntoView().should("be.visible");
  });
});

describe("drag ang drop functionality works correctly", function () {
  it(`should drag and drop bun into constructor`, function () {
    cy.get("[class^=burger-constructor_buns__]").as("bunsContainer");
    cy.get("[class^=burger-ingredients_items__]")
      .contains("Краторная булка N-200i")
      .as("bun");
    cy.get("@bun").trigger("dragstart");
    cy.get("@bunsContainer").trigger("drop");
    cy.get("@bun").find("[class^=counter_counter__]").as("counter");
    cy.get("@counter").should("contain", 2);
  });

  it("should drag and drop sauces into constructor", function () {
    cy.get("[class^=burger-constructor_items__]").as("sauceContainer");
    cy.get("[class^=burger-ingredients_items__]")
      .contains("Соус Spicy-X")
      .as("sauce");
    cy.get("@sauce").trigger("dragstart");
    cy.get("@sauceContainer").trigger("drop");
    cy.get("@sauce").find("[class^=counter_counter__]").as("counter");
    cy.get("@counter").should("contain", 1);
  });

  it("should drag and drop fillings into constructor", function () {
    cy.get("[class^=burger-constructor_items__]").as("fillingContainer");
    cy.get("[class^=burger-ingredients_items__]")
      .contains("Филе Люминесцентного тетраодонтимформа")
      .as("filling");
    cy.get("@filling").trigger("dragstart");
    cy.get("@fillingContainer").trigger("drop");
    cy.get("@filling").find("[class^=counter_counter__]").as("counter");
    cy.get("@counter").should("contain", 1);
  });

  it("ingredients should be swapped", function () {
    cy.get("[class^=ordered-ingredient_ingredient__]").first().as("firstElem");
    cy.get("[class^=ordered-ingredient_ingredient__]").last().as("lastElem");
    cy.get("@lastElem").trigger("dragstart").trigger("dragleave");
    cy.get("@firstElem")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");

    cy.get("[class^=ordered-ingredient_ingredient__]").last().as("lastEl");
    cy.get("[class^=ordered-ingredient_ingredient__]").first().as("firstEl");
    cy.get("@lastEl").trigger("dragstart").trigger("dragleave");
    cy.get("@firstEl")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");
  });
});

describe("count total price", function () {
  it("should count total price", function () {
    cy.get("[class^=burger-constructor_total__] p").contains(totalPrice);
  });
});

describe("post order", function () {
  it("should post request with order", function () {
    cy.get("[class^=button_button__]").contains("Оформить заказ").click();
    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", order);
  });

  it("should open modal window with order number", function () {
    cy.contains("идентификатор заказа");
    cy.contains("Ваш заказ начали готовить");
    cy.contains("Дождитесь готовности на орбитальной станции");
  });

  it("should close modal windows and clear burger constructor", function () {
    cy.get("[class^=modal_closeIcon__]").first().click();
    cy.get("[class^=button_button__]")
      .contains("Оформить заказ")
      .should("be.disabled");
  });
});

describe("app works correctly with routes", function () {
  it("should open Feed page by clicking the Feed link", function () {
    cy.get("a").contains("Лента заказов").click();
    cy.contains("Готовы");
    cy.contains("В работе");
    cy.contains("Выполнено за все время");
    cy.contains("Выполнено за сегодня");
  });
});
