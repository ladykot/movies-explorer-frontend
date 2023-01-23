import React, { useState } from 'react';
import Form from 'components/Form/Form';

function Login({ title, buttonText, linkText, bottomText }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

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
      bottomText={bottomText}
    >
      <fieldset className="form__inputs-register">
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
          minLength={2}
          maxLength={35}
          value={password || ''}
          onChange={handlePasswordChange}
        />
        <span className="form__inputs-error">{errorPassword}</span>
      </fieldset>
    </Form>
  );
}

export default Login;
