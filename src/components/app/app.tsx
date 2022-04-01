import React from 'react';
import clsx from 'clsx';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { BurgerContext } from '../../utils/burger-context';
import { API_URL } from '../../utils/api-url';
import Loader from '../loader/loader';
import appStyles from './app.module.css';

function App() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    const getProductData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL + 'ingredients');
        if (!response.ok) {
          setIsError(true);
          throw new Error('Something went wrong');
        }
        const result = await response.json();

        setData(result.data);
        setIsLoading(false);
      } catch(error) {
        setIsError(true);
        setIsLoading(false);
      }
    }
    getProductData();
  }, [])

  return (
    <BurgerContext.Provider value={data}>
      <div className={clsx(appStyles.app, "pb-10")}>
        <AppHeader />
        <section className={appStyles.appSection}>
          {!isLoading && !isError && (
            <>
              <BurgerIngredients details={data} />
              <BurgerConstructor />
            </>
          )}
          {isLoading && (
            <div className="m-30">
              <p className="mb-20 text text_color_inactive text_type_main-medium">Подгружаем для вас самые свежие ингредиенты</p>
              <Loader />
            </div>
          )}
          {isError && <p className="m-30 text text_color_inactive text_type_main-medium">На наших межгалактических серверах что-то пошло не так :( но мы уже транспортировались для исправления ошибок</p>}
        </section>
      </div>
    </BurgerContext.Provider>
  )
}

export default App;
