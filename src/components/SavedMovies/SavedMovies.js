import React, { useState, useEffect } from 'react';
import SearchForm from 'components/SearchForm/SearchForm';
import MoviesCardList from 'components/MoviesCardList/MoviesCardList';
import Preloader from 'components/Preloader/Preloader';
import searchFilter from 'utils/Filter';
import mainApi from 'utils/MainApi';
import './SavedMovies.css';
import {errors} from '../../utils/errors';

function SavedMovies() {
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem('savedMovies')) || []
  ); // берем фильмы из базы
  const [isLoading, setIsLoading] = useState(false); // состояние загрузки фильмов из базы
  const [error, setError] = useState('');

  const handleSearch = (query, isShort) => {
    setIsLoading(true);
    setError('');
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')); // кладем в переменную все фильмы
    const filtered = searchFilter(savedMovies, query, isShort); // фильтрация по запросу
    if (filtered.length === 0) {
      setError('Ничего не найдено');
    }
    setMovies(filtered);
    setIsLoading(false);
  };

  // отобразим все фильмы конкретного пользователя при загрузке страницы
  useEffect(() => {
    setIsLoading(true);
    mainApi
      .getUsersMovies() // фильмы всех пользователей
      .then((savedMovies) => {
        const user = localStorage.getItem('userId');
        const userMovies = savedMovies.filter((film) => film.owner === user); // из всех фильмов выбираем с подходщим id и сохраняем в переменную
        localStorage.setItem('savedMovies', JSON.stringify(userMovies)); // сохраняем их в хранилище
        setMovies(userMovies);
        setIsLoading(false);
        if (savedMovies.length === 0) {
          setError('Вы еще ничего не добавили в избранное');
        }
      })
      .catch((err) => {
        setError(errors(err));
      });
  }, []);

  return (
    <div className="movies">
      <SearchForm handleSearch={handleSearch} />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList movies={movies} error={error} />
      )}
    </div>
  );
}

export default SavedMovies;
