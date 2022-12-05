import React from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import logo from '../../images/logo.svg';

function HeaderAuth() {
  return (
    <header className="header-auth">
      <img className="header-authr__logo" src={logo} alt="логотип" />
      <div className="header-auth__list-container">

        <ul className="header-auth__links">
          <li className="header-auth__link-item">
            <Link to="/saved-movies" className="header-auth__link">
            Сохранённые фильмы
            </Link>
          </li>
          <li className="header-auth__link-item">
            <Link to="/movies" className="header-auth__link">
            Фильмы
            </Link>
          </li>
        </ul>

        <button className='header-auth__button-profile'>Аккаунт</button>
        {/* ToDo: add button name in constants */}
     </div>

      {/* {loggedIn && <p className="header__mail">{userData}</p>} */}
      {/* <NavLink
        to="/signin"
        className="header__mail header__mail_active"
        // onClick={handlerSubmit}
      >
        Выйти
      </NavLink> */}
    </header>
  );
}

export default HeaderAuth;
