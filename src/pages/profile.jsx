import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { makeStyles } from "@mui/styles";

import { SET_USER, updateUser, getUser } from "../services/actions";
import { ProfileMenu } from "../components/profile-menu";

export function ProfilePage() {
  const useStyles = makeStyles(() => ({
    wrapper: {
      width: "860px",
      margin: "120px auto 0",
      textAlign: "left",
      display: "flex",
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
  const form = useSelector((store) => store.user.form);
  const pass = useSelector((store) => store.login.form.password);
  const isUpdated = useSelector((store) => store.updateUser.isUpdated);

  const isUser = useSelector((store) => store.user.isUser);
  const updatedForm = useSelector((store) => store.updateUser.form);
  const [saveButton, setSaveButton] = useState(false);

  const [userData, setUserData] = useState({
    name: isUpdated ? updatedForm?.name : form?.name,
    email: isUpdated ? updatedForm?.email : form?.email,
    password: isUpdated ? pass : "",
  });

  const refName = useRef(null);
  const refEmail = useRef(null);
  const refPass = useRef(null);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (!isUser) {
    return <Redirect to='/login' />;
  }

  function fillField(e) {
    setSaveButton(true);
    setUserData({ ...userData, [e.target.name]: e.target.value });
    dispatch({
      type: SET_USER,
      payload: { ...form, [e.target.name]: e.target.value },
    });
  }

  async function submitForm(e) {
    e.preventDefault();
    dispatch(await updateUser(userData));
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

  return (
    <div className={classes.wrapper}>
      <ProfileMenu activeLink={"profile"} />

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
