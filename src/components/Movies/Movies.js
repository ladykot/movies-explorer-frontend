import React, { useState, useEffect } from 'react';
import SearchForm from 'components/SearchForm/SearchForm';
import MoviesCardList from 'components/MoviesCardList/MoviesCardList';
import moviesApi from 'utils/MoviesApi';
import mainApi from 'utils/MainApi';
import Preloader from 'components/Preloader/Preloader';
import searchFilter from 'utils/Filter';
import './Movies.css';
import { MOVVIES_MESSAGE, NOT_FOUND_MESSAGE } from '../../utils/constants';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // состояние загрузки фильмов из базы
  const [error, setError] = useState(''); // ошибка запроса

  // при открытии главной страницы с фильмами загрузили все сохраненки в хранилище key = savedMovies
  useEffect(() => {
    const savedMovies = localStorage.getItem('savedMovies');
    if (!savedMovies) {
      setIsLoading(true);
      mainApi
        .getUsersMovies()
        .then((data) => {
          console.log('фильмы пользователя', data);
          if (data.length > 0) {
            console.log()
            localStorage.setItem('savedMovies', JSON.stringify(data));
          }
          setIsLoading(false);
        })
        .catch(() => {
          setError(MOVVIES_MESSAGE);
        });
    }
  }, []);

  // фильтр по ключевому слову query
  const filter = (query, shorts) => {
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    const filtered = searchFilter(storedMovies, query, shorts);
    if (filtered.length === 0) {
      setError(NOT_FOUND_MESSAGE);
    }
    setMovies(filtered);
    setIsLoading(false);
  };

  // обработчик кнопки Найти фильм
  const handleSearch = (query, shorts) => {
    setIsLoading(true);
    // ищем ВСЕ фильмы в localStorage
    // если их нет - загружаем с beatfilm
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    if (!storedMovies) {
      moviesApi
        .getAllMovies()
        .then((films) => {
          // сохраняем фильмы
          localStorage.setItem('movies', JSON.stringify(films));
          filter(query, shorts);
        })
        .catch(() => {
          setError(MOVVIES_MESSAGE);
        });
    } else {
      filter(query, shorts);
    }
  };

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

export default Movies;