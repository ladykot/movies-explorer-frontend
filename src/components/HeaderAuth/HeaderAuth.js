import React from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import logo from '../../images/logo.svg';
import menuLogo from '../../images/icon__COLOR_icon-main.svg';

function HeaderAuth() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <img className='header__menu-icon' src={menuLogo} alt="иконка меню" />
    </header>
    
  );
}

export default HeaderAuth;
