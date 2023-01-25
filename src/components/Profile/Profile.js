import React, { useRef, useState } from 'react';
import './Profile.css';
import Header from 'components/Header/Header';
import '../Form/Form.css';
import './Profile.css';
import '../../vendor/hover.css';

function Profile({ title, handelLogUot, buttonText, onUpdateUser }) {
  // переменные состояний инпутов
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // состояния валидности полей
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  // состояния ошибок
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  // успех/неуспех сохранения данных
  const [isSaveData, setIsSaveData] = useState(false);

  // состояние сообщения о сохранении данных
  const [message, setMessage] = useState('');

  // состояние кнопки Редактировать
  const [isActiveEdit, setIsActiveEdit] = useState(false);

  // const input = useRef();

  // обработчик кнопки Выйти вызывает внешнюю функцию, переданную пропсом
  const handelLogoutProfile = () => {
    handelLogUot();
  };

  // хук ловит изменения в инпутах и скрывает сообщение о сохранении данных
  React.useEffect(() => {
    setMessage('');
  }, [name, email])

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
    // setIsActiveEdit(false)
    // Передаём значения управляемых компонентов во внешний обработчик
    // onUpdateUser({
    //   name,
    //   email,
    // });

    // после сохранения/несохранения данных выводим сообщение
    if (!isSaveData) {
      setMessage('Данные успешно сохранены');
      setIsSaveData(false); // начальное состояние
    } else {
      setMessage('Что-то пошло не так');
    }
    
    setIsActiveEdit(false)
    
  };

  return (
    <div className="profile">
      <Header />

      <div className="profile__content">
        <p className="form-profile__title">{title}</p>
        <form className="form-profile">
          <fieldset className="form-profile__inputs">
            <label className="form-profile__label">
              Имя
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
            </label>

            <span className="form__inputs-error form__inputs-error_profile">
              {errorName}
            </span>
            <div className="form__line"></div>

            <label className="form-profile__label">
              E-mail
              <input
                type="email"
                className="form-profile__inputs-item"
                placeholder="E-mail"
                required
                value={email || ''}
                onChange={handleEmailChange}
              />
            </label>

            <span className="form__inputs-error form__inputs-error_profile">
              {errorEmail}
            </span>
          </fieldset>
        </form>

        <div className="profile__links">
          <span className="profile__links-item profile__edit-message">
            {message}
          </span>

          <button
            onClick={handleSubmitProfile}
            type="submit"
            disabled={!isActiveEdit}
            className={`profile__links-item ${isActiveEdit && "hover"}`}
          >
            Редактировать
          </button>
          <button className="profile__links-item hover" onClick={handelLogoutProfile}>
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
