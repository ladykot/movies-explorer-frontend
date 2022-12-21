import React from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />

      {/* две группы роутов "/" и остальные */}
      <Route exact path="/">
        <ul className="header__links">
          <li className="header__link-item">
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
          </li>
          <li className="header__link-item header__link-item_login">
            <Link to="/signin" className="header__link">
              Войти
            </Link>
          </li>
        </ul>
      </Route>

      <Route path={['/movies', '/saved-movies', '/profile']}>
        <nav className="header__links-movies">
          <Link to="/movies" className="header__link">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="header__link">
            Сохрененные фильмы
          </Link>
        </nav>
        <button className="profile-button">Аккаунт</button>
      </Route>

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
