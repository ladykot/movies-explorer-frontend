import React, {useState} from 'react';
import Form from 'components/Form/Form';


function Register({title, buttonText, linkText}) {
    // переменные состояний инпутов
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

      <Form 
        title={title}
        buttonText={buttonText}
        linkText={linkText}
      >
      <fieldset className="form__inputs-register">
            <label className="form__label">Имя</label>
            <input
              type="name"
              className="form__inputs-item"
              minLength="2"
              maxLength="35"
              placeholder="Имя"
              id="name"
              value={name || ''}
              onChange={handleNameChange}
              required
            />
            <span className="form__inputs-error">{errorName}</span>
            <label className="form__label">E-mail</label>
            <input
              type="email"
              className="form__inputs-item"
              placeholder="E-mail"
              required
              value={email || ''}
              onChange={handleEmailChange}
            />
            <span className="form__inputs-error">{errorEmail}</span>
            <label className="form__label">Пароль</label>
            <input
              type="password"
              className="form__inputs-item"
              placeholder="Придумайте пароль"
              required
              minLength="2"
              maxLength="35"
              value={password || ''}
              onChange={handlePasswordChange}
            />
            <span className="form__inputs-error">{errorPassword}</span>
      </fieldset>
      </Form>
  );
};

export default Register;
