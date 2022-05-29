import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./pages.module.css";
import { RESET_PASSWORD, forgotPassword } from "../services/actions/forgotPass";
import { getUser } from "../services/actions/user";
import { TRootState } from "../services/reducers";

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const form = useSelector((store: TRootState) => store.forgotPass.form);
  const isUser = useSelector((store: TRootState) => store.user.isUser);
  const forgotPassFailed = useSelector(
    (store: TRootState) => store.forgotPass.forgotPassFailed
  );
  const [error, setError] = useState(false);

  if (isUser) {
    history.push("/");
  }

  function fillField(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: RESET_PASSWORD,
      payload: { ...form, [e.target.name]: e.target.value },
    });
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(forgotPassword(form));
    dispatch(getUser());
    if (!forgotPassFailed) {
      history.push("/reset-password");
    } else {
      setError(true);
    }
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={(e) => submitForm(e)}>
        <h1 className='text text_type_main-medium mb-6'>
          {!error ? "Восстановление пароля" : "Такой почты у нас нет :("}
        </h1>
        <div className='mb-6'>
          <Input
            type='email'
            placeholder='Укажите e-mail'
            name='email'
            value={form.email}
            onChange={(e) => fillField(e)}
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
