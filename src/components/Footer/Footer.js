import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <p className="footer__copyright">© 2020</p>
      <nav>
        <ul className='footer__list'>
            <li className='footer__list-item'>Яндекс.Практикум</li>
            <li className='footer__list-item'>Github</li>
        </ul>
      </nav>
    </footer>
  );
}
export default Footer;
