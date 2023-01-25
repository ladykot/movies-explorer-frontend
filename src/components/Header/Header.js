import React, { useState } from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';
import '../../vendor/hover.css';
import menuLogo from '../../images/icon__COLOR_icon-main.svg';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

// вместе с бургер-меню
function Header(loggedIn) {
  const [activeBurger, setActiveBurger] = useState(false);
  loggedIn = false;

  // переключатель бургер-меню
  function handleActiveBurger() {
    setActiveBurger(!activeBurger);
  }

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="логотип" />
      </Link>

      {/* две группы роутов "/" и остальные */}
      <Route exact path="/">
        {!loggedIn && <ul className="header__links">
          <li className="header__link-item">
            <Link to="/signup" className="header__link hover">
              Регистрация
            </Link>
          </li>
          <li className="header__link-item header__link-item_login">
            <Link to="/signin" className="header__link hover">
              Войти
            </Link>
          </li>
        </ul>}
        
      </Route>

      <Route path={['/movies', '/saved-movies', '/profile']}>
        <nav className="header__links-movies">
          <NavLink
            to="/movies"
            className="header__link hover"
            activeClassName="header__link_active"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="header__link hover"
            activeClassName="header__link_active"
          >
            Сохрененные фильмы
          </NavLink>
        </nav>
        <Link to="/profile" className="profile-button-wraper">
          <button className="profile-button hover">Аккаунт</button>
        </Link>

        <img
          className="header__menu-icon hover"
          src={menuLogo}
          alt="иконка меню"
          onClick={handleActiveBurger}
        />

        {activeBurger && (
          <section className='burger-menu-section'>
            <div className="burger-menu">
              <button
                onClick={handleActiveBurger}
                type="button"
                className="burger-menu__button-close"
              ></button>
              <nav className="burger-menu__container">
                <ul className="burger-menu__list">
                  <li className="burger-menu__list-item">
                    <NavLink
                      exact
                      to="/"
                      className="burger-menu__link hover"
                      activeClassName="burger-menu__link-active"
                    >
                      Главная
                    </NavLink>
                  </li>
                  <li className="burger-menu__list-item">
                    <NavLink
                      exact
                      to="/movies"
                      className="burger-menu__link hover"
                      activeClassName="burger-menu__link-active"
                    >
                      Фильмы
                    </NavLink>
                  </li>
                  <li className="burger-menu__list-item">
                    <NavLink
                      exact
                      to="/saved-movies"
                      className="burger-menu__link hover"
                      activeClassName="burger-menu__link-active"
                    >
                      Сохранённые фильмы
                    </NavLink>
                  </li>
                </ul>
              </nav>
              <Link className="profile-button-wraper-burger" to="/profile">
                <button className="profile-button hover" onClick={handleActiveBurger}>Аккаунт</button>
              </Link>
            </div>
          </section>
        )}
      </Route>
    </header>
  );
}

export default Header;
