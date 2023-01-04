import React, { useState } from 'react';
import './App.css';
import Header from 'components/Header/Header';
import Main from 'components/Main/Main';
import Footer from 'components/Footer/Footer';
import { Route, Switch } from 'react-router-dom';
import Register from 'components/Register/Register';
import Login from 'components/Login/Login';
import Movies from 'components/Movies/Movies';

// handler Login
// нажитмаем на Войти - открывается Login

function App() {

  return (
    <div className="page">
      <Route exact path="/signin">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Register />
      </Route>
      <Route exact path="/movies">
        <Movies />
      </Route>
      <Route exact path="/">
        <Header />
        <Main />
        <Footer />
      </Route>
    </div>
  );
}

export default App;
