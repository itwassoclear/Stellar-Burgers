import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./reset-password.module.css";
import { SET_PASSWORD, resetPassword } from "../services/actions";

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const form = useSelector((store) => store.resetPass.form);
  const forgotPassForm = useSelector((store) => store.forgotPass.form.email);
  const isPassReseted = useSelector((store) => store.resetPass.isPassReseted);
  const isUser = useSelector((store) => store.user.isUser);
  const [error, setError] = useState(false);

  if (isUser) {
    history.push("/");
  }

  if (forgotPassForm.length === 0) {
    history.push("forgot-password");
  }

  function fillField(e) {
    dispatch({
      type: SET_PASSWORD,
      payload: { ...form, [e.target.name]: e.target.value },
    });
  }

  async function submitForm(e) {
    e.preventDefault();
    dispatch(resetPassword(form));
    if (isPassReseted) {
      history.push("/login");
    } else {
      setError(true);
    }
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={(e) => submitForm(e)} className={styles.form}>
        <h1 className='text text_type_main-medium mb-6'>
          {!error ? "Восстановление пароля" : "Попробуйте ещё раз :("}
        </h1>
        <div className='mb-6'>
          <PasswordInput
            type='password'
            placeholder='Введите новый пароль'
            name='password'
            onChange={(e) => fillField(e)}
            value={form.password}
          />
        </div>
        <div className='mb-6'>
          <Input
            type='text'
            placeholder='Введите код из письма'
            name='token'
            onChange={(e) => fillField(e)}
            value={form.token}
          />
        </div>
        <div className='mb-20'>
          <Button type='primary' size='medium'>
            Восстановить
          </Button>
        </div>
        <p className='text text_type_main-default text_color_inactive mb-4'>
          Вспомнили пароль?{" "}
          <Link to='/login' className={styles.link}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}
