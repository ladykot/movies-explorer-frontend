import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom/cjs/react-router-dom.min';
import logo from '../../images/logo.svg';
import './Form.css';
import { useForm } from 'react-hook-form';

function Form({
  nameForm,
  title,
  buttonText,
  linkText,
  bottomText,
  onSubmit,
  // errors,
  // register,
}) {
  // состояние кнопки Сохранить
  // const [isDisabled, setIsDisabled] = useState(true);
  // состояния полей
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // состояния валидности полей
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  // состояния ошибок
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');


  // объект хука формы
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // const handelSubmitForm = ({name, email, password}) => {
  //   // e.preventDefault();
  //   onSubmit({name, email, password});
  // }

  // обработчики инпутов
  function handleNameChange(e) {
    const input = e.target;
    setUserName(input.value);
    setIsValidName(input.validity.valid);
    if (!isValidName) {
      setErrorEmail(input.validationMessage);
    } else {
      setErrorName('');
      // включить кнопку
      // setIsDisabled(false);
    }
  }

  function handleEmailChange(event) {
    const input = event.target;
    setEmail(input.value);
    setIsValidEmail(input.validity.valid);
    if (!isValidEmail) {
      setErrorEmail(input.validationMessage);
    } else {
      setErrorEmail('');
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    const input = event.target;
    setPassword(input.value);
    setIsValidPassword(input.validity.valid);
    if (!isValidPassword) {
      setErrorPassword(input.validationMessage);
    } else {
      setErrorPassword('');
    }
  }

  console.log(errors);

  return (
    <div className="form__container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-top">
          <Link to="/">
            <img className="header__logo" src={logo} alt="логотип" />
          </Link>
          <p className="form__title">{title}</p>
        </div>
        <fieldset className="form__inputs-register">
          <label className="form__label">
            <span className="form__label_title">Имя</span>
            <input
              {...register('name', {
                required: true,
                onChange: (e) => handleNameChange(e),
                minLength: 2,
                maxLength: 35,
              })}
              type="name"
              className="form__inputs-item"
              placeholder="Имя"
              // id="name"
              value={name || ''}
            ></input>
            {errors.name && errors.name.type === 'required' && (
              <span className="form__inputs-error">
                Добавьте, пожалуйста, имя
              </span>
            )}
            {errors.name && errors.name.type === 'minLength' && (
              <span className="form__inputs-error">
                Имя не бывает таким коротким
              </span>
            )}
          </label>

          <label className="form__label">
            <span className="form__label_title">E-mail</span>
            <input
              {...register('email', {
                required: true,
                onChange: (e) => handleEmailChange(e),
                pattern: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
              })}
              type="email"
              className="form__inputs-item"
              placeholder="E-mail"
              value={email || ''}
            />
            {errors.email && errors.email.type === 'required' && (
              <span className="form__inputs-error">
                Добавьте, пожалуйста, ваш E-mail
              </span>
            )}
            {errors.email && errors.email.type === 'pattern' && (
              <span className="form__inputs-error">
                E-mail написан с ошибкой
              </span>
            )}
          </label>
          {nameForm === 'signup' && (
            <label className="form__label">
              <span className="form__label_title">Пароль</span>
              <input
                {...register('password', {
                  required: true,
                  minLength: 6,
                  maxLength: 35,
                  onChange: (e) => handlePasswordChange(e),
                })}
                type="password"
                className="form__inputs-item"
                placeholder="Придумайте пароль"
                value={password || ''}
              />
              {errors.password && errors.password.type === 'required' && (
                <span className="form__inputs-error">
                  Без пароля не получится, сорри
                </span>
              )}
              {errors.password && errors.password.type === 'minLength' && (
                <span className="form__inputs-error">
                  Безопасный пароль включает не менее 6 символов
                </span>
              )}
              {errors.password && errors.password.type === 'maxLength' && (
                <span className="form__inputs-error">
                  Слишком длинный пароль
                </span>
              )}
            </label>
          )}
        </fieldset>
        <div className="form__bottom">
          <button
            type="submit"
            className={`button__sumbit ${
              errors.name &&
              errors.password &&
              errors.email &&
              'button__sumbit_disable'
            } hover`}
          >
            {buttonText}
          </button>
          <div className="form__bottom-signin">
            <p className="form__bottom-text">{bottomText}</p>
            <Link to="/signin" className="form__bottom-link hover">
              {linkText}
            </Link>
          </div>
        </div>
      </form>

      <Route exact path="/profile">
        <form className="form">
          <div className="form-top">
            <p className="form__title">{title}</p>
          </div>
        </form>
      </Route>
    </div>
  );
}

export default Form;
