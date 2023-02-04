import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom/cjs/react-router-dom.min';
import logo from '../../images/logo.svg';
import './Form.css';

function Form({
  name,
  title,
  buttonText,
  linkText,
  bottomText,
  onSubmit,
  errors,
  register,
}) {
  // состояние кнопки Сохранить
  const [isDisabled, setIsDisabled] = useState(true);
  // состояния полей
  const [username, setUserName] = useState('');
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

  // обработчики инпутов
  function handleNameChange(e) {
    const input = e.target;
    setUserName(input.value);
    setIsValidName(input.validity.valid);
    if (!isValidName) {
      setErrorName(input.validationMessage);
    } else {
      setErrorName('');
      // включить кнопку
      setIsDisabled(false);
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

  return (
    <div className="form__container">
      <form className="form" onSubmit={onSubmit}>
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
                required: 'Поле обязательно для заполнения',
                onChange: handleNameChange,
              })}
              type="name"
              className="form__inputs-item"
              minLength={2}
              maxLength={35}
              placeholder="Имя"
              id="username"
              value={username || ''}
              // onChange={handleNameChange}
              // required
            ></input>
            {errors?.name && <span className="form__inputs-error">Error</span>}
          </label>

          <label className="form__label">
            <span className="form__label_title">E-mail</span>
            <input
              {...register('email', {
                required: 'Поле обязательно для заполнения',
              })}
              type="email"
              className="form__inputs-item"
              placeholder="E-mail"
              required
              value={email || ''}
              onChange={handleEmailChange}
            />
            {/* <span className="form__inputs-error">{errorEmail}</span> */}
            {errors?.email && <span className="form__inputs-error">Error</span>}
          </label>
          {name === 'signup' && 
            <label className="form__label">
              <span className="form__label_title">Пароль</span>
              <input
                {...register('password', {
                  required: 'Поле обязательно для заполнения',
                })}
                type="password"
                className="form__inputs-item"
                placeholder="Придумайте пароль"
                required
                minLength={2}
                maxLength={35}
                value={password || ''}
                onChange={handlePasswordChange}
              />
              {/* <span className="form__inputs-error">{errorPassword}</span> */}
              {errors.email && (
                <span className="form__inputs-error">Error</span>
              )}
            </label>
          }
        </fieldset>
        <div className="form__bottom">
          <button
            type="submit"
            className={`button__sumbit ${
              isDisabled && 'button__sumbit_disable'
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
