import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <nav>
        <ul className="footer__list">
          <li className="footer__list-item">Яндекс.Практикум</li>
          <li className="footer__list-item">Github</li>
        </ul>
      </nav>
      <p className="footer__copyright">© 2020</p>
    </footer>
  );
}
export default Footer;
