import { FC } from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import clsx from "clsx";
import headerStyles from "./app-header.module.css";

const AppHeader: FC = () => {
  return (
    <header className={clsx(headerStyles.appHeader, "pt-4 pb-4")}>
      <div className={headerStyles.appHeaderLeftButtons}>
        <Link
          to='/'
          className={clsx(
            headerStyles.appHeaderButton,
            headerStyles.link,
            headerStyles.activeLink,
            "pr-5 pl-5 pt-4 pb-4 mr-2"
          )}
        >
          <div className='mr-2'>
            <BurgerIcon type='primary' />
          </div>
          <p className='text text_type_main-default'>Конструктор</p>
        </Link>
        <Link
          to='/'
          className={clsx(
            headerStyles.appHeaderButton,
            headerStyles.link,
            "pr-5 pl-5 pt-4 pb-4"
          )}
        >
          <div className='mr-2'>
            <ListIcon type='secondary' />
          </div>
          <p className='text text_type_main-default text_color_inactive'>
            Лента заказов
          </p>
        </Link>
      </div>

      <Link
        to='/'
        className={clsx(headerStyles.link, headerStyles.appHeaderLogo)}
      >
        <Logo />
      </Link>

      <Link
        to='/profile'
        className={clsx(
          headerStyles.link,
          headerStyles.appHeaderButton,
          "pr-5 pl-5 pt-4 pb-4"
        )}
      >
        <div className='mr-2'>
          <ProfileIcon type='secondary' />
        </div>
        <p className='text text_type_main-default text_color_inactive'>
          Личный кабинет
        </p>
      </Link>
    </header>
  );
};

export default AppHeader;
