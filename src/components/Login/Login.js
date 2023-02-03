import React, { useState } from 'react';
import Form from 'components/Form/Form';

function Login({ title, buttonText, linkText, bottomText, onLogin }) {
  const handleLoginSubmit = () => {
    onLogin({ email, password });
  };
  return (
    <Form
      onSubmit={handleLoginSubmit}
      title={title}
      buttonText={buttonText}
      linkText={linkText}
      bottomText={bottomText}
    ></Form>
  );
}

export default Login;
