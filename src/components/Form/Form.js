import React from 'react';
import logo from '../../images/logo.svg';


function Form() {
  return (
    <form className="form">
      <div className="login-greetings">
        <img className="header__logo" src={logo} alt="логотип" />
        <p className="login-text">Рады видеть!</p>
      </div>
    </form>
  );
}

export default Form;
