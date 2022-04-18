import { useEffect} from 'react';
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import clsx from 'clsx';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import Loader from '../loader/loader';
import appStyles from './app.module.css';
import { getItems } from '../../services/actions/index';

function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getItems())
  }, [dispatch]);

  const { items } = useSelector((state: RootStateOrAny) => state.items)

  return (
      <div className={clsx(appStyles.app, "pb-10")}>
        <AppHeader />
        <section className={appStyles.appSection}>
          {items ? (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          ) : (
            <div className="m-30">
              <p className="mb-20 text text_color_inactive text_type_main-medium">Подгружаем для вас самые свежие ингредиенты</p>
              <Loader />
            </div>
          )}
        </section>
      </div>
  )
}

export default App;
