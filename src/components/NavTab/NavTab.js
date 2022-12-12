import React from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <nav>
      <ul className="promo__navigation">
        <li className="promo__navigation-item">
          <Link to="" className="promo__navigation-link">
            О проекте
          </Link>
        </li>
        <li className="promo__navigation-item">
          <Link to="" className="promo__navigation-link">
            Технологии
          </Link>
        </li>
        <li className="promo__navigation-item">
          <Link to="" className="promo__navigation-link">
            Студент
          </Link>
        </li>
      </ul>
    </nav>
  );
}
  
export default NavTab;
