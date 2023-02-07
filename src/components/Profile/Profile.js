import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import Header from 'components/Header/Header';
import '../Form/Form.css';
import './Profile.css';
import '../../vendor/hover.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ handleLogout, onUpdateUser, isEditData, errorEdit }) {
  const currentUser = useContext(CurrentUserContext);
  // console.log(currentUser.data.name)
  // переменные состояний инпутов
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // состояния валидности полей
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  // состояния ошибок
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  // состояние кнопки Редактировать
  const [isActiveEdit, setIsActiveEdit] = useState(false);

  // хук ловит изменения в инпутах и скрывает сообщение о сохранении данных
  // useEffect(() => {
  //   setMessage('');
  // }, [currentUser, name, email]);

  // обновить данные на текущего пользователя
  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  // useEffect(() => {
  //   const { name, email } = form.values;
  //   if (
  //     form.isValid &&
  //     (currentUser.name !== name || currentUser.email !== email)
  //   ) {
  //     setDisabled(false);
  //   } else {
  //     setDisabled(true);
  //   }
  // }, [form.values, currentUser]);

  // обработчики инпутов
  function handleNameChange(event) {
    setIsActiveEdit(true);
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
    setIsActiveEdit(true);
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

  // обработчик кнопки Редактировать
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    setIsActiveEdit(false); // кнопка Редактировать отключена
    onUpdateUser({ name, email }); // отправляем на сервер
  };

  return (
    <div className="profile">
      <Header />

      <div className="profile__content">
        <p className="form-profile__title">{`Привет, ${currentUser.name}!`}</p>

        <form className="form-profile" onSubmit={handleSubmitProfile}>
          <fieldset className="form__inputs-register">
            <label className="form__label form__label_profile">
              <span className="form__label_title form__label_title_profile">
                Имя
              </span>
              <input
                type="name"
                className="form__inputs-item form__inputs-item_profile"
                minLength={2}
                maxLength={35}
                placeholder="Имя"
                id="name"
                value={name || ''}
                onChange={handleNameChange}
                required
              ></input>
              <span className="form__inputs-error form__inputs-error_profile">
                {errorName}
              </span>
            </label>

            <label className="form__label form__label_profile">
              <span className="form__label_title form__label_title_profile">
                E-mail
              </span>
              <input
                type="email"
                className="form__inputs-item_profile form__inputs-item_profile_last"
                placeholder="E-mail"
                required
                value={email || ''}
                onChange={handleEmailChange}
              />
              <span className="form__inputs-error form__inputs-error_profile ">
                {errorEmail}
              </span>
            </label>
          </fieldset>
        </form>

        <div className="profile__links">
          {errorEdit && (
            <span className="profile__links-item profile__edit-message">
              Что-то пошло не так...
            </span>
          )}
          {isEditData && (
            <span className="profile__links-item profile__edit-message">
              Данные успешно сохранены!
            </span>
          )}

          <button
            type="submit"
            disabled={!isActiveEdit}
            className={`profile__links-item ${isActiveEdit && 'hover'}`}
          >
            Редактировать
          </button>
          <button
            className="profile__links-item profile__links-item_signout hover"
            onClick={handleLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
