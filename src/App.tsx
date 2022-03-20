import appStyles from './App.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import data from './utils/data'

function App() {
  return (
    <div className="App">
      <AppHeader />
      <section className={appStyles.appSection}>
        <BurgerIngredients details={data} />
        <BurgerConstructor details={data} />
      </section>
    </div>
  );
}

export default App;
