import React, { useState, useEffect } from 'react';
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
  const [loggedIn, setLoggedIn] = useState(false);
  // const [userName, setUserName] = useState('');


  const [currentUser, setCurrentUser] = useState({}); // текущий пользователь

  const [textError, setTextError] = useState('');
  const history = useHistory();
  const isJwt = localStorage.getItem('jwt') || false;


  // проверим при загрузке страницы, есть ли токен (чтобы пользователь не вылетел и не вводил заново данные)
  // - если есть - запрашиваем в апи данные пользователя по токену, логинимся, сохраняем id пользователя в localStorage
  // - если нет -
  // useEffect(() => {
  //   const jwt = localStorage.getItem('jwt');
  //   if (jwt) {
  //     mainApi
  //       .getUserInfo()
  //       .then((user) => {
  //         // debugger
  //         if (user) {
  //           setLoggedIn(true); // логин!!
  //           localStorage.setItem('userId', user._id);
  //           setCurrentUser(user);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     setLoggedIn(false);
  //   }
  // }, []);

  // обработчик Логина
  const onLogin = ({ email, password }) => {
    // debugger
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

  // запросить инфо при успешном токене
  // и подставить данные в текущего полоьзователя
  // useEffect(() => {
  //   console.log(loggedIn);
  //   if (loggedIn) {
  //     mainApi
  //       .getUserInfo()
  //       .then((user) => {
          
  //         setCurrentUser(user);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [loggedIn]);

  // Аутотенфикация: если токен валиден, сохраняем данные, и пользователь логинится
  const auth = async (jwt) => {
    return mainApi
      .getUserInfo(jwt)
      .then((user) => {
        // если такой user есть, то логинимся
        if (user) {
          setLoggedIn(true);
          localStorage.setItem('userId', user._id); // сохраняем id в хранилище
          setCurrentUser(user);
          history.push('/movies');
        } else {
          setLoggedIn(false);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // проверка наличия токена в хранилище при изменении loggedIn
  // если токен есть - аутотенфицируемся
  React.useEffect(() => {
    if (!loggedIn) {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        auth(jwt);
      }
    }
  }, [loggedIn]);

  function handleLogout() {
    setCurrentUser({});
    localStorage.clear();
    setLoggedIn(false);
    history.push('/');
  }

  // обработчик Регистрации: после успешной регистрации - логинимся (при этом нужно установить данные пользователя в текущего юзера) и попадаем главную с фильмами
  // иначе - на главную презентационную
  const onRegister = ({ name, email, password }) => {
    console.log({ name, email, password });
    mainApi
      .register({ name, email, password })
      .then((data) => {
        console.log(data);
        if (data) {
          onLogin({ email, password });
        } else {
          history.push('./');
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
            exact
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
          />
          <ProtectedRoute
            exact
            path="/profile"
            loggedIn={loggedIn}
            currentUser={currentUser}
            component={Profile}
            // onUpdateUser={handelEditProfile}
            handleLogout={handleLogout}
            // errorEdit={errorEdit}
          />
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path='/movies'>
            { loggedIn
              ? <Redirect to='/movies' />
              : <Redirect to='/' />
            }
          </Route>
          <Route exact path='/saved-movies'>
            { loggedIn
              ? <Redirect to='/saved-movies' />
              : <Redirect to='/' />
            }
          </Route>
          <Route exact path='/profile'>
            { loggedIn
              ? <Redirect to='/profile' />
              : <Redirect to='/' />
            }
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
