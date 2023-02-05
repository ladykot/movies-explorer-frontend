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
  const [isLoading, setLoading] = useState(false); // состояние загрузки фильмов из базы
  const [error, setError] = useState(''); // ошибка запроса

  //
  useEffect(() => {
    const savedMovies = localStorage.getItem('savedMovies');
    if (!savedMovies) {
      setLoading(true);
      mainApi
        .getUserMovies()
        .then((films) => {
          if (films.length > 0) {
            localStorage.setItem('savedMovies', JSON.stringify(films));
          }
          setLoading(false);
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
    setLoading(false);
  };

  // обработчик кнопки Найти фильм
  const handleSearch = (query, shorts) => {
    setLoading(true);
    
    // ищем фильмы в localStorage
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

  // обработчик кнопки Еще

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
