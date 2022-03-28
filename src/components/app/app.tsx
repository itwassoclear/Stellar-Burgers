import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import clsx from 'clsx';

const API_URL = 'https://norma.nomoreparties.space/api/'

function App() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    const getProductData = async () => {
      try {
        // const result = await fetch(API_URL + 'ingredients').then((response) => {
        //   return response.json();
        // })
        // .then((data) => {
        //   return data
        // })
        // .catch(e => console.log(e))

        const response = await fetch(API_URL + 'ingredients')
        if (!response.ok) {
          throw new Error('Something went wrong')
        }
        const result = await response.json()

        setData(result.data)
        setIsLoading(false)
      } catch(error) {
        console.log('error', error);
        setIsError(true)
        setIsLoading(false)
      }
    }
    getProductData();
  }, [])

  return (
    <div className={clsx(appStyles.app, "pb-10")}>
      <AppHeader />
      <section className={appStyles.appSection}>
        {!isLoading && !isError && (
          <>
            <BurgerIngredients details={data} />
            <BurgerConstructor details={data} />
          </>
        )}
      </section>
    </div>
  )
}

export default App;
