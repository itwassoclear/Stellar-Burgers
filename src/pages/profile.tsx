import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./pages.module.css";

import { SET_USER, updateUser, getUser } from "../services/actions/user";
import { ProfileMenu } from "../components/profile-menu";
import { TRootState } from "../services/types/index";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../services/actions/websocket";
import { getCookie } from "../utils/cookie";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const form = useSelector((store: TRootState) => store.user.form);
  const pass = useSelector((store: TRootState) => store.login.form.password);
  const isUpdated = useSelector(
    (store: TRootState) => store.updateUser.isUpdated
  );

  const isUser = useSelector((store: TRootState) => store.user.isUser);
  const updatedForm = useSelector((store: TRootState) => store.updateUser.form);
  const [saveButton, setSaveButton] = useState(false);

  const [userData, setUserData] = useState({
    name: isUpdated ? updatedForm?.name : form?.name,
    email: isUpdated ? updatedForm?.email : form?.email,
    password: isUpdated ? pass : "",
  });

  const refName = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPass = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (form.name && form.email) {
      const token = getCookie("accessToken")?.split("Bearer ")[1];
      if (token) {
        dispatch(wsConnectionStart(token));

        return () => {
          dispatch(wsConnectionClosed());
        };
      }
    }
  }, [dispatch, form]);

  if (!isUser) {
    return <Redirect to='/login' />;
  }

  function fillField(e: React.ChangeEvent<HTMLInputElement>) {
    setSaveButton(true);
    setUserData({ ...userData, [e.target.name]: e.target.value });
    dispatch({
      type: SET_USER,
      payload: { ...form, [e.target.name]: e.target.value },
    });
  }

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(await updateUser(userData));
  }

  const onIconClickName = () => {
    setTimeout(() => refName?.current?.focus(), 0);
  };
  const onIconClickEmail = () => {
    setTimeout(() => refEmail?.current?.focus(), 0);
  };
  const onIconClickPassword = () => {
    setTimeout(() => refPass?.current?.focus(), 0);
  };

  const cancelEdit = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    dispatch(getUser());
    setUserData({ ...form, password: pass });
    setSaveButton(false);
  };

  return (
    <div className={styles.orderWrapper}>
      <ProfileMenu activeLink={"profile"} />

      <form className={styles.form} onSubmit={(e) => submitForm(e)}>
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
        <div className={styles.buttons}>
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
};
