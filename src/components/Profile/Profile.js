import React, { useState } from 'react';
import './Profile.css';
import Header from 'components/Header/Header';
import '../Form/Form.css';
import './Profile.css';

function Profile({ title, handelEditProfile, handelLogUot, buttonText }) {
  // переменные состояний инпутов
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // состояния валидности полей
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  // состояния ошибок
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  // обработчик кнопки Выйти вызывает внешнюю функцию, переданную пропсом
  const handelLogoutProfile = () => {
    handelLogUot();
  };

  // обработчики инпутов
  function handleNameChange(event) {
    setName(event.target.value);
    const input = event.target;
    setName(input.value);
    setIsValidName(input.validity.valid);
    if (!isValidName) {
      setErrorName(input.validationMessage);
    } else {
      setErrorName('');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    const input = event.target;
    setEmail(input.value);
    setIsValidEmail(input.validity.valid);
    if (!isValidEmail) {
      setErrorEmail(input.validationMessage);
    } else {
      setErrorEmail('');
    }
  }

  return (
    <div className="profile">
      <Header />
      <div className="profile__content">
        <p className="form-profile__title">{title}</p>
        <form className="form-profile">
          <fieldset className="form-profile__inputs">
            <label className="form-profile__label">Имя</label>
            <input
              type="name"
              className="form-profile__inputs-item"
              placeholder="Имя"
              required
              value={name || ''}
              minLength={2}
              maxLength={35}
              onChange={handleNameChange}
            />
            <span className="form__inputs-error">{errorName}</span>
            <div className="form__line"></div>
            <label className="form-profile__label">E-mail</label>
            <input
              type="email"
              className="form-profile__inputs-item"
              placeholder="E-mail"
              required
              value={email || ''}
              onChange={handleEmailChange}
            />
            <span className="form__inputs-error">{errorEmail}</span>
          </fieldset>
        </form>
        {/* кнопка появилась в неактивном виде после клика на Редактировать. Меняется состояние. */}
        <button type="submit" className="button__sumbit">
          {buttonText}
        </button>
        <div className="profile__links">
          <button
            type="button"
            className="profile__links-item"
            onClick={handelEditProfile}
          >
            Редактировать
          </button>
          <button
            className="profile__links-item profile__links-item_signout"
            onClick={handelLogoutProfile}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
