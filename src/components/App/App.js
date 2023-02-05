import React, { useState } from 'react';
import './App.css';
import Header from 'components/Header/Header';
import Main from 'components/Main/Main';
import Footer from 'components/Footer/Footer';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from 'components/Register/Register';
import Login from 'components/Login/Login';
import PageNotFound from 'components/PageNotFound/PageNotFound';
import Profile from 'components/Profile/Profile';
import Movies from 'components/Movies/Movies';
import SavedMovies from 'components/SavedMovies/SavedMovies';
import { useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import mainApi from 'utils/MainApi';
import { UNAUTHORIZED } from '../../utils/constants';
// импортируем контекст пользователя
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

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
  const [userName, setUserName] = useState('');
  const [currentUser, setCurrentUser] = useState({}); // текущий пользователь

  const [textError, setTextError] = useState('');
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

  // обработчик Логина
  const onLogin = ({ email, password }) => {
    console.log('зашли в логин', { email, password });
    mainApi
      .authorize({ email, password })
      .then((jwt) => {
        if (jwt.token) {
          localStorage.setItem('jwt', jwt.token);
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((err) => {
        if (err.status === UNAUTHORIZED) {
          setTextError('Неверный логин или пароль');
        } else {
          console.log(err);
          setTextError('Ошибка входа');
        }
        console.error(err);
      })
      .finally(() => {
        setTextError('');
      });
  };

  // Аутотенфикация: если токен валиден, сохраняем данные, и пользователь логинится
  const auth = async (jwt) => {
    return mainApi
      .getUserInfoFromServer()
      .then(({ data }) => {
        // если такой user есть, то логинимся
        if (data) {
          setLoggedIn(true);
          // установить данные в профиле
          setUserName(data.name);
          history.push('/movies');
        } else {
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // проверка наличия токена в хранилище при изменении loggedIn
  React.useEffect(() => {
    if (!loggedIn) {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        auth(jwt);
      }
    }
  }, [loggedIn]);

  // обработчик Регистрации
  const onRegister = ({ name, email, password }) => {
    console.log({ name, email, password });
    // отправляем запрос на наш API
    mainApi
      .register({ name, email, password })
      .then((data) => {
        console.log(data);
        // после успешной регистрации попадаем главную с фильмами
        if (data) {
          onLogin({ email, password });
        } else {
          // history.push('./');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Route path={['/movies', '/saved-movies', '/', '/profile']}>
          <Header loggedIn={loggedIn} />
        </Route>
        <Switch>
          <Route exact path="/signin">
            <Login
              title="Вход"
              buttonText="Войти"
              linkText="Регистрация"
              bottomText="Ещё не зарегистрированы?"
              onLogin={onLogin}
            />
          </Route>
          <Route exact path="/signup">
            <Register
              title="Добро пожаловать!"
              buttonText="Зарегистрироваться"
              linkText="Войти"
              bottomText="Уже зарегистрированы?"
              onRegister={onRegister}
            />
          </Route>

          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            onCardLike={handleCardLike} // добавить в избранное
            onCardClick={handleCardClick} // ссылка на ролик
            cards={cards}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            onCardLike={handleCardLike}
            onCardClick={handleCardClick}
            cards={cards}
          />
          <ProtectedRoute
            exact
            path="/profile"
            loggedIn={loggedIn}
            title={`Привет, ${userName}`}
            component={Profile}
            onUpdateUser={handelEditProfile}
            handelLogUot={handelLogUot}
            buttonText="Сохранить"
          />
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/*">
            <PageNotFound />
          </Route>
        </Switch>
        <Route exact path={['/', '/movies', '/saved-movies']}>
          <Footer />
        </Route>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
