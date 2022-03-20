import headerStyles from './app-header.module.css';
import clsx from 'clsx';

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return (
      <header className={clsx(headerStyles.appHeader, "pt-4 pb-4")}>
        <div className={headerStyles.appHeaderLeftButtons}>
          <div className={clsx(headerStyles.appHeaderButton, "p-5 mr-2")}>
            <div className="mr-2">
              <BurgerIcon type="primary" className="m-2" />
            </div>
            <p className="text text_type_main-default">Конструктор</p>
          </div>
          <div className={clsx(headerStyles.appHeaderButton, "p-5")}>
            <div className="mr-2">
              <ListIcon type="secondary" className="m-2" />
            </div>
            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
          </div>
        </div>

        <div className={headerStyles.appHeaderLogo}>
          <Logo />
        </div>

        <div className={clsx(headerStyles.appHeaderButton, "p-5")}>
          <div className="mr-2">
            <ProfileIcon type="secondary" />
          </div>
          <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
        </div>

      </header>
    );
}

export default AppHeader
