import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import data from '../../utils/data'
import clsx from 'clsx';

function App() {
  return (
    <div className={clsx(appStyles.app, "mb-10")}>
      <AppHeader />
      <section className={appStyles.appSection}>
        <BurgerIngredients details={data} />
        <BurgerConstructor details={data} />
      </section>
    </div>
  );
}

export default App;
