import React, { useState } from 'react';
import './App.css';
import Header from 'components/Header/Header';
import Main from 'components/Main/Main';
import Footer from 'components/Footer/Footer';
import { Route, Switch } from  'react-router-dom';
import Register from 'components/Register/Register';
import Login from 'components/Login/Login';
import PageNotFound from 'components/PageNotFound/PageNotFound';
import Profile from 'components/Profile/Profile';
import Movies from 'components/Movies/Movies';
import { useHistory } from 'react-router-dom';

function App() {
  // временный объект с данными для карточек (не забыть добавить link)
  const data = [
    {
      title: '33 слова о дизайне',
      duration: '1ч 42м',
      _id: '1',
    },
    {
      title: '33 слова о дизайне',
      duration: '1ч 42м',
      _id: '2',
    },
    {
      title: '33 слова о дизайне',
      duration: '1ч 42м',
      _id: '3',
    },
  ];

  const [cards] = useState(data);

  // состояние, когда мы залогинились, равно true
  const [loggedIn, setLoggedIn] = useState(true);
  const history = useHistory();

  // отобразим карточки при рендеринге (потом карточки появятся только после поиска)
  // React.useEffect(() => {
  //   if (loggedIn) {
  //     setCards(data);
  //   }
  // });

  const handelEditProfile = () => {
    // установить новые данные
  };

  //обработка кнопки Выйти
  const handelLogUot = () => {
    // перенаправить на /login
    history.push('/signin');
  };

  // обработка лайка
  function handleCardLike() {}

  // обработка клика на фильм
  const handleCardClick = () => {};

  // состояние разлогина
  const onSignOut = () => {
    setLoggedIn(false);
    // localStorage.removeItem('jwt');
    history.push('/signin');
  };

  return (
    <div className="page">
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
          <Header loggedIn={loggedIn} onSignOut={onSignOut} />
          <Movies
            onCardLike={handleCardLike}
            onCardClick={handleCardClick}
            cards={cards}
          />
          <Footer />
        </Route>
        <Route exact path="/saved-movies">
          <Header loggedIn={loggedIn} onSignOut={onSignOut} />
          <Movies
            onCardLike={handleCardLike}
            onCardClick={handleCardClick}
            cards={cards}
          />
          <Footer />
        </Route>
        <Route exact path="/profile">
          <Profile
            title="Привет, Виталий!"
            onUpdateUser={handelEditProfile}
            handelLogUot={handelLogUot}
            buttonText="Сохранить"
          />
        </Route>
        <Route exact path="/">
          <Header loggedIn={loggedIn} onSignOut={onSignOut} />
          <Main />
          <Footer />
        </Route>
        <Route path="/*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
