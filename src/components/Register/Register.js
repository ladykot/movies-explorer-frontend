import React, { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import Form from 'components/Form/Form';

function Register({ title, buttonText, linkText, bottomText, onRegister }) {
  // обработка сабмита регистрации
  // const handeleRegisterSubmit = (e, { name, email, password }) => {
  //   console.log(e.target);
  //   console.log('обработка')
  //   e.preventDefault();
  //   onRegister({ name, email, password });
  // };

  // форма из хука
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm();

  return (
    <Form
      onSubmit={handleSubmit(onRegister)}
      errors={errors}
      register={register}
      title={title}
      buttonText={buttonText}
      linkText={linkText}
      bottomText={bottomText}
    ></Form>
  );
}

export default Register;
