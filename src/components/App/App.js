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
import { useHistory } from "react-router-dom";

function App() {
  // состояние, когда мы залогинились, равно true
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const handelEditProfile = () => {
    // установить новые данные
  }

  const handelLogUot = () => {
    // перенаправить на /login
    history.push('/login');
  }

  // обработка лайка
  function handleCardLike() {
  
  }

  return (
    <div className="page">
      <Header loggedIn={loggedIn}/>
      <Switch>

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
          <Movies onCardLike={handleCardLike}/>
        </Route>
        <Route exact path="/profile">
          <Profile
            title="Привет, Виталий!"
            handelEditProfile={handelEditProfile}
            handelLogUot={handelLogUot}
            buttonText='Сохранить'
          />
        </Route>
        <Route exact path="/">
          
          <Main />
          
        </Route>
        <Route exact path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
