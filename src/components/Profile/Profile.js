import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import Header from 'components/Header/Header';
import mainApi from 'utils/MainApi';
import '../Form/Form.css';
import './Profile.css';
import '../../vendor/hover.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ handleLogout, loggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);
  const [isEditData, setIsEditData] = useState(false); // состояние факта сохранения данных
  const [errorEdit, setErrorEdit] = useState(false); // состояние ошибки редактирования
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [isActiveEdit, setIsActiveEdit] = useState(false);

  // хук ловит изменения в инпутах и скрывает сообщение о сохранении данных
  useEffect(() => {
    if (currentUser.name !== name || currentUser.email !== email) {
      setIsEditData(false);
    }
  }, [currentUser, name, email]);

  // обновить данные на текущего пользователя
  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  // установить новые данные в профиле
  const handelEditProfile = ({ name, email }) => {
    mainApi
      .saveUserInfo({ name, email })
      .then((userData) => {
        console.log('текущий', currentUser);
        setIsEditData(true);
        setErrorEdit(false);
      })
      .catch(() => {
        setErrorEdit(true);
      })
      .finally(() => {
        setErrorEdit(false);
      });
  };

  // обработчик кнопки Редактировать
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    // Проверка на отличие данных
    if (name !== currentUser.name || email !== currentUser.email) {
      setIsActiveEdit(true); // кнопка Редактировать отключена
      handelEditProfile({ name, email }); // отправляем на сервер
    } else {
      setIsActiveEdit(false); // кнопка Редактировать включена, но не будет отправки на сервер без изменений
    }
  };

  // обработчики инпутов
  function handleNameChange(event) {
    setIsActiveEdit(true);
    setIsEditData(false);
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

  return (
    <div className="profile">
      <Header loggedIn={loggedIn} />

      <div className="profile__content">
        <p className="form-profile__title">{`Привет, ${currentUser.name}!`}</p>

        <form
          id="profile"
          className="form-profile"
          onSubmit={handleSubmitProfile}
          noValidate
        >
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
            form="profile"
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
