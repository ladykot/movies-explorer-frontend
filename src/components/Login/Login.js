import React, { useState } from 'react';
import Form from 'components/Form/Form';
import { useForm } from 'react-hook-form';

function Login({ title, buttonText, linkText, bottomText, onLogin }) {
  // const handleLoginSubmit = (e, { email, password }) => {
  //   e.preventDefault();
  //   if (!email || !password) {
  //     return;
  //   }
  //   onLogin({ email, password });
  // };

  // форма из хука
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <Form
      name='signin'
      onSubmit={handleSubmit(onLogin)}
      errors={errors}
      register={register}
      title={title}
      buttonText={buttonText}
      linkText={linkText}
      bottomText={bottomText}
    ></Form>
  );
}

export default Login;
