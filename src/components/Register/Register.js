import React, { useState } from 'react';
import Form from 'components/Form/Form';

function Register({ title, buttonText, linkText, bottomText }) {
  
  return (
    <Form
      title={title}
      buttonText={buttonText}
      linkText={linkText}
      bottomText={bottomText}
    >
    </Form>
  );
}

export default Register;
