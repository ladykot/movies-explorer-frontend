import React, { useState } from 'react';
import './App.css';
import Header from 'components/Header/Header';
import Main from 'components/Main/Main';
import Footer from 'components/Footer/Footer';
import { Route, Switch } from 'react-router-dom';
import Register from 'components/Register/Register';
import Login from 'components/Login/Login';
import PageNotFound from 'components/PageNotFound/PageNotFound';
import Profile from 'components/Profile/Profile';
import Movies from 'components/Movies/Movies';

// handler Login
// нажитмаем на Войти - открывается Login

function App() {
  return (
    <div className="page">
      <Route exact path="/signin">
        <Login
          title="Рады видеть!"
          buttonText="Войти"
          linkText="Регистрация"
          bottomText="Уже зарегистрированы?"
        />
      </Route>
      <Route exact path="/signup">
        <Register
          title="Добро пожаловать!"
          buttonText="Зарегистрироваться"
          linkText="Войти"
          bottomText="Ещё не зарегистрированы?"
        />
      </Route>
      <Route exact path="/movies">
        <Movies />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/">
        <Header />
        <Main />
        <Footer />
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
    </div>
  );
}

export default App;
