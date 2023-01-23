import React from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <nav>
      <ul className="promo__navigation">
        <li className="promo__navigation-item">
          <a href='#about-project' className="promo__navigation-link">
            О проекте
          </a>
        </li>
        <li className="promo__navigation-item">
          <a href="/#tech" className="promo__navigation-link">
            Технологии
          </a>
        </li>
        <li className="promo__navigation-item">
          <a href="#about-me" className="promo__navigation-link">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}
  
export default NavTab;
