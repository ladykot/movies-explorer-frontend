import React from 'react';
import { Route, Link } from 'react-router-dom/cjs/react-router-dom.min';
import logo from '../../images/logo.svg';
import './Form.css';

function Form({ title, buttonText, linkText, bottomText, children }) {
  return (
    <div className="form__container">
      <Route exact path="/signup">
        <form className="form">
          <div className="form-top">
            <img className="header__logo" src={logo} alt="логотип" />
            <p className="form__title">{title}</p>
          </div>
          {children}
          <div className="form__bottom">
            <button type="submit" className="button__sumbit">
              {buttonText}
            </button>
            <div className="form__bottom-signin">
              <p className="form__bottom-text">{bottomText}</p>
              <Link to="/signin" className="form__bottom-link">
                {linkText}
              </Link>
            </div>
          </div>
        </form>
      </Route>

      <Route exact path="/signin">
        <form className="form">
          {children}
          <div className="form__bottom">
            <button type="submit" className="button__sumbit">
              {buttonText}
            </button>
            <div className="form__bottom-signin">
              <p className="form__bottom-text">{bottomText}</p>
              <Link to="/signin" className="form__bottom-link">
                {linkText}
              </Link>
            </div>
          </div>
        </form>
      </Route>
    </div>
  );
}

export default Form;
