import React, { useState } from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';
import menuLogo from '../../images/icon__COLOR_icon-main.svg';

// вместе с бургер-меню
function Header() {
  const [activeBurger, setActiveBurger] = useState(false);

  function handleOpenBurger() {
    setActiveBurger(!activeBurger);
  }
  return (
    <header className="header">
      {/* <Link to="/"> */}
      <img className="header__logo" src={logo} alt="логотип" />
      {/* </Link> */}

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
          <Link to="/movies" className="header__link header__link_active">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="header__link">
            Сохрененные фильмы
          </Link>
        </nav>
        <button className="profile-button" onClick={handleOpenBurger}>
          Аккаунт
        </button>
        <img
          className="header__menu-icon"
          src={menuLogo}
          alt="иконка меню"
          onClick={handleOpenBurger}
        />
        {/* {activeBurger && ( */}
          <div className="burger-menu">
            <button
              onClick={handleOpenBurger}
              type="button"
              className="burger-menu__button-close"
            ></button>
            <nav className='burger-menu__container'>
              <ul className='burger-menu__list'>
                <li className='burger-menu__list-item'>
                  <NavLink to='/' className='burger-menu__link' activeClassName='burger-menu__link-active'>Главная</NavLink>
                </li>
                <li className='burger-menu__list-item'>
                  <NavLink to='/movies' className='burger-menu__link' activeClassName='burger-menu__link-active'>Фильмы</NavLink>
                </li>
                <li className='burger-menu__list-item'>
                  <NavLink to='/saved-movies' className='burger-menu__link' activeClassName='burger-menu__link-active'>Сохранённые фильмы</NavLink>
                </li>
              </ul>
            </nav>
            <button className='profile-button'>Аккаунт</button>
          </div>
        {/* )} */}
      </Route>

    </header>
  );
}

export default Header;
