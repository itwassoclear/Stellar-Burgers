import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { makeStyles } from "@mui/styles";

import { SET_USER, updateUser, getUser, logout } from "../services/actions";
import clsx from "clsx";

export function ProfilePage() {
  const useStyles = makeStyles(() => ({
    wrapper: {
      width: "860px",
      margin: "120px auto 0",
      textAlign: "left",
      display: "flex",
    },
    links: { display: "flex", flexDirection: "column", width: "320px" },
    link: {
      textDecoration: "none",
      color: "#8585AD",
      height: "64px",
      display: "flex",
      alignItems: "center",
    },
    button: {
      height: "64px",
      padding: 0,
      background: "none",
      border: "none",
      color: "#8585AD",
      textAlign: "left",
    },
    activeLink: {
      textDecoration: "none",
      color: "#fff",
      height: "64px",
      display: "flex",
      alignItems: "center",
    },
    form: {
      width: "480px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },
    buttons: {
      display: "flex",
    },
  }));

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const form = useSelector((store) => store.user.form);
  const pass = useSelector((store) => store.login.form.password);

  const isUser = useSelector((store) => store.user.isUser);
  const updatedForm = useSelector((store) => store.updateUser.form);
  const [saveButton, setSaveButton] = useState(false);

  const [userData, setUserData] = useState({
    name: form ? form.name : updatedForm.name,
    email: form ? form.email : updatedForm.email,
    password: pass ? pass : "",
  });

  const refName = useRef(null);
  const refEmail = useRef(null);
  const refPass = useRef(null);

  if (!isUser) {
    history.push("/login");
  }

  function fillField(e) {
    setSaveButton(true);
    setUserData({ ...userData, [e.target.name]: e.target.value });
    dispatch({
      type: SET_USER,
      payload: { ...form, [e.target.name]: e.target.value },
    });
  }

  function submitForm(e) {
    e.preventDefault();
    dispatch(updateUser(userData));
  }

  const onIconClickName = () => {
    setTimeout(() => refName.current.focus(), 0);
  };
  const onIconClickEmail = () => {
    setTimeout(() => refEmail.current.focus(), 0);
  };
  const onIconClickPassword = () => {
    setTimeout(() => refPass.current.focus(), 0);
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    dispatch(getUser());
    setUserData({ ...form, password: pass });
    setSaveButton(false);
  };

  const logoutUser = () => {
    dispatch(logout());
    dispatch(getUser());
  };

  return (
    <div className={classes.wrapper}>
      <div className={clsx(classes.links, "mr-15")}>
        <Link
          to='/profile'
          className={clsx(classes.activeLink, "text text_type_main-medium")}
        >
          Профиль
        </Link>
        <Link
          to='/profile/orders'
          className={clsx(classes.link, "text text_type_main-medium")}
        >
          История заказов
        </Link>
        <button
          onClick={logoutUser}
          className={clsx(classes.button, "text text_type_main-medium")}
        >
          Выход
        </button>

        <p className='text text_type_main-default text_color_inactive mt-20'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <form className={classes.form} onSubmit={(e) => submitForm(e)}>
        <div className='mb-6'>
          <Input
            type='text'
            placeholder='Имя'
            name='name'
            onChange={(e) => fillField(e)}
            value={userData.name}
            icon='EditIcon'
            onIconClick={onIconClickName}
            ref={refName}
          />
        </div>
        <div className='mb-6'>
          <Input
            type='text'
            placeholder='Логин'
            name='email'
            onChange={(e) => fillField(e)}
            value={userData.email}
            icon='EditIcon'
            onIconClick={onIconClickEmail}
            ref={refEmail}
          />
        </div>
        <div className='mb-6'>
          <Input
            type='password'
            placeholder='Пароль'
            name='password'
            onChange={(e) => fillField(e)}
            value={userData.password}
            icon='EditIcon'
            onIconClick={onIconClickPassword}
            ref={refPass}
          />
        </div>
        <div className={classes.buttons}>
          {saveButton && (
            <div className='mr-4'>
              <Button
                type='secondary'
                size='medium'
                onClick={(e) => cancelEdit(e)}
              >
                Отмена
              </Button>
            </div>
          )}
          <Button type='primary' size='medium' disabled={!saveButton}>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}
