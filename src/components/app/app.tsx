import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import clsx from 'clsx';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

function App() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json()
        setData(data.data)
        setIsLoading(false)
      } catch(error) {
        console.log('error', error);
        setIsError(true)
      }
    }
    getProductData();
  }, [])

  return (
    <>
    <div id="modal"></div>
    <div className={clsx(appStyles.app, "mb-10")}>
      <AppHeader />
      <section className={appStyles.appSection}>
        {!isLoading && !isError && (
          <>
            <BurgerIngredients details={data} />
            <BurgerConstructor details={data} />
          </>
        )}
      </section>
    </div></>
  )
}

export default App;
