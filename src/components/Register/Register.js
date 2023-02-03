import React, { useState } from 'react';
import Form from 'components/Form/Form';

function Register({ title, buttonText, linkText, bottomText, onRegister }) {
  // const [name, setName] = React.useState("");
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");

  // обработка сабмита регистрации
  const handeleRegisterSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, email, password });
    resetForm();
  };

  // reset email & password
  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Form
      onSubmit={handeleRegisterSubmit}
      title={title}
      buttonText={buttonText}
      linkText={linkText}
      bottomText={bottomText}
    ></Form>
  );
}

export default Register;
