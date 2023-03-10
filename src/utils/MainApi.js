import { BASE_URL } from './constants'; // наш бек

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    // console.log(res)
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      Authorization: `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  register({ name, email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(this._handleResponse);
  }

  authorize({ email, password }) {
    console.log('авторизация...');
    // debugger
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._handleResponse);
  }

  getUsersMovies() {
    // debugger
    return fetch(`${this._baseUrl}/movies`, { 
      method: 'GET',
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

  // Сохранение на сервере фильма юзера (лайк)
  saveMovie(movie) {
    // debugger
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._getHeaders(),
      method: 'POST',
      body: JSON.stringify(movie),
    }).then(this._handleResponse);
  }

  deleteMovie(movieId) {
    // debugger
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

  // getUserInfo() {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: 'GET',
  //     headers: this._getHeaders(),
  //   }).then(this._handleResponse);
  // }

  getUserInfo(jwt) {
    // console.log(jwt);
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

  saveUserInfo({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._handleResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;