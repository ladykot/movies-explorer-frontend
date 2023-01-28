import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom/cjs/react-router-dom.min';
import logo from '../../images/logo.svg';
import './Form.css';

function Form({ title, buttonText, linkText, bottomText, children }) {
  // состояние кнопки Сохранить
  const [isDisabled, setIsDisabled] = useState(true);

  const [name, setName] = useState('');
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
  function handleNameChange(event) {
    const input = event.target;
    setName(input.value);
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
      <Route exact path="/signup">
        <form className="form">
          <div className="form-top">
            <img className="header__logo" src={logo} alt="логотип" />
            <p className="form__title">{title}</p>
          </div>
          <fieldset className="form__inputs-register">
            <label className="form__label">
              <span className="form__label_title">Имя</span>
              <input
                type="name"
                className="form__inputs-item"
                minLength={2}
                maxLength={35}
                placeholder="Имя"
                id="name"
                value={name || ''}
                onChange={handleNameChange}
                required
              ></input>
              <span className="form__inputs-error">{errorName}</span>
            </label>

            <label className="form__label">
              <span className="form__label_title">E-mail</span>
              <input
                type="email"
                className="form__inputs-item"
                placeholder="E-mail"
                required
                value={email || ''}
                onChange={handleEmailChange}
              />
              <span className="form__inputs-error">{errorEmail}</span>
            </label>

            <label className="form__label">
              <span className="form__label_title">Пароль</span>
              <input
                type="password"
                className="form__inputs-item"
                placeholder="Придумайте пароль"
                required
                minLength={2}
                maxLength={35}
                value={password || ''}
                onChange={handlePasswordChange}
              />
              <span className="form__inputs-error">{errorPassword}</span>
            </label>
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
      </Route>

      <Route exact path="/signin">
        <form className="form">
          <div className="form-top">
            <img className="header__logo" src={logo} alt="логотип" />
            <p className="form__title">{title}</p>
          </div>
          <fieldset className="form__inputs-register">
            <label className="form__label">
              <span className="form__label_title">Имя</span>
              <input
                type="name"
                className="form__inputs-item"
                minLength={2}
                maxLength={35}
                placeholder="Имя"
                id="name"
                value={name || ''}
                onChange={handleNameChange}
                required
              ></input>
              <span className="form__inputs-error">{errorName}</span>
            </label>
            <label className="form__label">
              <span className="form__label_title">E-mail</span>
              <input
                type="email"
                className="form__inputs-item"
                placeholder="E-mail"
                required
                value={email || ''}
                onChange={handleEmailChange}
              />
              <span className="form__inputs-error">{errorEmail}</span>
            </label>
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
              <Link to="/signup" className="form__bottom-link hover">
                {linkText}
              </Link>
            </div>
          </div>
        </form>
      </Route>

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
