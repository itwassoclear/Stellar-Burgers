import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { register, SET_REGISTRATION } from "../services/actions";
import styles from "./register.module.css";

export function RegisterPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const form = useSelector((store) => store.registration.form);
  const isUser = useSelector((store) => store.user.isUser);

  if (isUser) {
    history.push("/");
  }

  function fillField(e) {
    dispatch({
      type: SET_REGISTRATION,
      payload: { ...form, [e.target.name]: e.target.value },
    });
  }

  function submitForm(e) {
    e.preventDefault();
    dispatch(register(form));
    history.push("/");
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={(e) => submitForm(e)}>
        <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
        <div className='mb-6'>
          <Input
            type='text'
            placeholder='Имя'
            name='name'
            value={form.name}
            onChange={(e) => fillField(e)}
          />
        </div>
        <div className='mb-6'>
          <Input
            type='email'
            placeholder='E-mail'
            name='email'
            value={form.email}
            onChange={(e) => fillField(e)}
          />
        </div>
        <div className='mb-6'>
          <PasswordInput
            type='password'
            placeholder='Пароль'
            name='password'
            value={form.password}
            onChange={(e) => fillField(e)}
          />
        </div>
        <div className='mb-20'>
          <Button type='primary' size='medium'>
            Зарегистрироваться
          </Button>
        </div>
        <p className='text text_type_main-default text_color_inactive mb-4'>
          Уже зарегистрированы?{" "}
          <Link to='/login' className={styles.link}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}
