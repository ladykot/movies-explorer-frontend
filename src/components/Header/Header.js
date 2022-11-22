import React from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />

      <div className="header__list-container">
        <ul className="header__links">
          <li className="header__link-item">
            <Link to="/signin" className="header__link">
              Войти
            </Link>
          </li>
        </ul>

        <ul className="header__links">
          <li className="header__link-item">
            <Link to="/signup" className="header__link">
            Регистрация
            </Link>
          </li>
        </ul>
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

export default Header;
