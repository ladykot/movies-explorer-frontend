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
  // const [userName, setUserName] = useState('');
  const [isEditData, setIsEditData] = useState(false); // успех/неуспех сохранения данных профиля
  const [errorEdit, setErrorEdit] = useState(false); // состояние ошибки редактирования

  const [currentUser, setCurrentUser] = useState({}); // текущий пользователь

  const [textError, setTextError] = useState('');
  const history = useHistory();
  const isJwt = localStorage.getItem("jwt") || false;

  // установить новые данные в профиле
  const handelEditProfile = ({ name, email }) => {
    console.log('зашли')
    mainApi
      .saveUserInfo({ name, email })
      .then((userData) => {
        console.log('сохранено')
        setIsEditData(true);
        setErrorEdit(false); // ошибки нет - ставим в Profile зеленое сообщение успеха
      })
      .catch(() => {
        setErrorEdit(true);
      })
      .finally(() => {
        setErrorEdit(false);
      });
  };

  // проверим токен при загрузке страницы
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    // debugger
    if (jwt) {
      mainApi
        .getUserInfo()
        .then((user) => {
          if (user) {
            setLoggedIn(true);
            localStorage.setItem('userId', user._id);
            setCurrentUser(user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
        
    } else {
      setLoggedIn(false);
    }
  }, []);

  // обработчик Логина
  const onLogin = ({ email, password }) => {
    console.log({ email, password });
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

    //запрос инфо при успешном токене
    useEffect(() => {
      if (loggedIn) {
        mainApi
          .getUserInfo()
          .then((user) => {
            setCurrentUser(user);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, [loggedIn]);

  // Аутотенфикация: если токен валиден, сохраняем данные, и пользователь логинится
  // const auth = async (jwt) => {
  //   return mainApi
  //     .getUserInfo()
  //     .then((data) => {
  //       // если такой user есть, то логинимся
  //       if (data) {
  //         setLoggedIn(true);
  //         // установить данные в профиле
  //         setUserName(data.name);
  //         history.push('/movies');
  //       } else {
  //         history.push('/');
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     mainApi
  //       .getUserInfo()
  //       .then((user) => {
  //         if (user) {
  //           setLoggedIn(true);
  //           localStorage.setItem("userId", user._id);
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

    // проверка наличия токена в хранилище при изменении loggedIn
    // React.useEffect(() => {
    //   if (!loggedIn) {
    //     if (localStorage.getItem('jwt')) {
    //       const jwt = localStorage.getItem('jwt');
    //       auth(jwt);
    //     }
    //   }
    // }, [loggedIn]);

  function handleLogout() {
    setCurrentUser({});
    localStorage.clear();
    setLoggedIn(false);
    history.push('/');
  }

  // обработчик Регистрации
  const onRegister = ({ name, email, password }) => {
    console.log({ name, email, password });
    mainApi
      .register({ name, email, password })
      .then((data) => {
        console.log(data);
        // после успешной регистрации попадаем главную с фильмами
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
            isEditData={isEditData}
            component={Profile}
            onUpdateUser={handelEditProfile}
            handleLogout={handleLogout}
            errorEdit={errorEdit}
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
