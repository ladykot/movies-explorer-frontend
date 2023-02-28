import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import '../../vendor/hover.css';
import mainApi from 'utils/MainApi';
import { BAD_REQUEST_CODE } from '../../utils/constants';
import {
  Redirect,
  useHistory,
} from 'react-router-dom/cjs/react-router-dom.min';

function MoviesCard({ movie }) {
  const [isSaved, setIsSaved] = useState(false);
  const [savedId, setSavedId] = useState('');
  const location = useLocation(); // для установки кнопки лайка
  // const history = useHistory();

  // сделать попап с сообщением об ошибках

  const handleMovieSaved = (evt) => {
    // debugger
    if (!isSaved) {
      const newMovie = {};
      const { image, id } = movie;

      Object.assign(newMovie, movie); // копируем всё в новый объект
      delete newMovie.id;
      delete newMovie.created_at;
      delete newMovie.updated_at;

      // Добавить значения 
      Object.entries(newMovie).forEach((key) => {
        if (!key[1]) {
          newMovie[key[0]] = '...';
        }
      });

      mainApi
        .saveMovie({
          ...newMovie,
          image: `https://api.nomoreparties.co/${image.url}`,
          thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
          movieId: id,
        })
        .then((savedMovie) => {
          // debugger
          setIsSaved(true);
          setSavedId(savedMovie._id);
          let savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
          if (!savedMovies) {
            savedMovies = [];
          }
          savedMovies.push(savedMovie);
          // debugger
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        })
        .catch((err) => {
          if (err.status === BAD_REQUEST_CODE) {
            console.log('Что-то пошло не так...');
          } else {
            console.log('Нет соединения');
          }
        });
    } else { // если isSaved === true
      console.log("состояние фильма по которому клик:", isSaved)
      console.log(savedId)
      mainApi
        .deleteMovie(savedId)
        .then(() => {
          setIsSaved(false);
          const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
          // Поиск и удаление сохраненного фильма из массива в localStorage
          let index = 0;
          for (let i = 0; i < savedMovies.length; i += 1) {
            const film = savedMovies[i];
            if (film._id === movie._id) {
              index = i;
            }
          }
          savedMovies.splice(index, 1);
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
          if (location.pathname === '/saved-movies') {
            evt.target.closest('.movies__list-item').remove();
          }
        })
        .catch(() => console.log('Нет соединения'));
        // .catch((err) => console.dir(err));
    }
  };

  return (
    <div className="movies-cards__item">
      <div className="movies-card__item-content">
        <img
          onClick={event =>  window.location.href=`${movie.trailerLink}`}
          className="movies-card__pic"
          alt={movie.image.name}
          src={
            location.pathname === '/movies'
              ? `https://api.nomoreparties.co/${movie.image.url}`
              : movie.image
          }
        />

        <div className="movies-card__text">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <p className="movies-card__description">{`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}</p>
        </div>
        {location.pathname === '/saved-movies' ? (
          <button
            type="button"
            className="movies-card__like movies-card__like_type_selected hover"
            aria-label="лайк"
            onClick={handleMovieSaved}
          ></button>
        ) : (
          <button
            type="button"
            className={
              isSaved
                ? 'movies-card__like hover'
                : 'movies-card__like movies-card__like_type_notliked hover'
            }
            aria-label="лайк"
            onClick={handleMovieSaved}
          ></button>
        )}
      </div>
    </div>
  );
}

export default MoviesCard;
