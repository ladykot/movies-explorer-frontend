import React, { useState } from 'react';
import { useCallback } from 'react';
import './App.css';
import Header from 'components/Header/Header';
import Main from 'components/Main/Main';
import Footer from 'components/Footer/Footer';
import { Route, Switch, Redirect } from 'react-router-dom';
import InfoTooltip from 'components/InfoTooltip/InfoTooltip';
import Register from 'components/Register/Register';
import Login from 'components/Login/Login';
import PageNotFound from 'components/PageNotFound/PageNotFound';
import Profile from 'components/Profile/Profile';
import Movies from 'components/Movies/Movies';
import SavedMovies from 'components/SavedMovies/SavedMovies';
import { useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import mainApi from 'utils/MainApi';
import { errors } from '../../utils/errors';
// импортируем контекст пользователя
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({}); // текущий пользователь
  const [textError, setTextError] = useState('');
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [statusInfo, setStatusInfo] = useState(false);
  const history = useHistory();

  const onLogin = async ({ email, password }) => {
    try {
      const jwt = await mainApi.authorize({ email, password });
      if (jwt.token) {
        localStorage.setItem('jwt', jwt.token);
        const user = await mainApi.getUserInfo();
        if (user) {
          localStorage.setItem('userId', user.data._id);
          setCurrentUser(user.data);
          setLoggedIn(true);
          setStatusInfo(true);
          setTextError('Вы успешно вошли в аккаунт');
          history.push('/movies');
        }
      }
    } catch (err) {
      setTextError(errors(err));
      setStatusInfo(false);
    } finally {
      setInfoTooltipOpen(true);
    }
  };


  const auth = useCallback(async (jwt) => {
    return mainApi
      .getUserInfo(jwt)
      .then((user) => {
        // если такой user есть, то логинимся
        if (user) {
          setLoggedIn(true);
          localStorage.setItem('userId', user.data._id); // сохраняем id в хранилище
          setCurrentUser(user.data);
          history.push('/movies');
        } else {
          setLoggedIn(false);
          history.push('/');
        }
      })
      .catch((err) => {
        setTextError(errors(err));
        setInfoTooltipOpen(true);
      });
  }, [setLoggedIn, setCurrentUser, setTextError, setInfoTooltipOpen, history]);
  
  React.useEffect(() => {
    if (!loggedIn) {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        auth(jwt);
      }
    }
  }, [loggedIn, auth]);

  function closeAllPopups() {
    setInfoTooltipOpen(false);
  }

  // Аутотенфикация: если токен валиден, сохраняем данные, и пользователь логинится
  // const auth = async (jwt) => {
  //   return mainApi
  //     .getUserInfo(jwt)
  //     .then((user) => {
  //       // если такой user есть, то логинимся
  //       if (user) {
  //         setLoggedIn(true);
  //         localStorage.setItem('userId', user.data._id); // сохраняем id в хранилище
  //         setCurrentUser(user.data);
  //         history.push('/movies');
  //       } else {
  //         setLoggedIn(false);
  //         history.push('/');
  //       }
  //     })
  //     .catch((err) => {
  //       setTextError(errors(err));
  //       setInfoTooltipOpen(true);
  //     });
  // };

  // // проверка наличия токена в хранилище при изменении loggedIn
  // // если токен есть - аутотенфицируемся
  // React.useEffect(() => {
  //   if (!loggedIn) {
  //     if (localStorage.getItem('jwt')) {
  //       const jwt = localStorage.getItem('jwt');
  //       auth(jwt);
  //     }
  //   }
  // }, [loggedIn, auth]);



  function handleLogout() {
    setCurrentUser({});
    localStorage.clear();
    setLoggedIn(false);
    history.push('/');
  }

  // обработчик Регистрации: после успешной регистрации - логинимся (при этом нужно установить данные пользователя в текущего юзера) и попадаем главную с фильмами
  // иначе - на главную презентационную
  const onRegister = ({ name, email, password }) => {
    mainApi
      .register({ name, email, password })
      .then((data) => {
        if (data) {
          onLogin({ email, password });
          setTextError('Вы успешно зарегистрировались!');
        } else {
          history.push('./');
        }
      })
      .catch((err) => {
        setTextError(errors(err));
        setStatusInfo(false);
      })
      .finally(() => {
        setInfoTooltipOpen(true);
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
            // currentUser={currentUser}
            component={Profile}
            handleLogout={handleLogout}
          />
          <Route exact path="/">
            <Main />
          </Route>
          {/* <Route exact path="/movies">
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/saved-movies">
            {loggedIn ? <Redirect to="/saved-movies" /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/profile">
            {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/" />}
          </Route> */}
          <Route path="/*">
            <PageNotFound />
          </Route>
        </Switch>
        <Route exact path={['/', '/movies', '/saved-movies']}>
          <Footer />
        </Route>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSucess={statusInfo}
          onClose={closeAllPopups}
          textError={textError}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
