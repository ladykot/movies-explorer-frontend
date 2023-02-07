import React, { useState, useEffect } from 'react';
import SearchForm from 'components/SearchForm/SearchForm';
import MoviesCardList from 'components/MoviesCardList/MoviesCardList';
import Preloader from 'components/Preloader/Preloader';
import searchFilter from 'utils/Filter';
import mainApi from 'utils/MainApi';
import './SavedMovies.css';

function SavedMovies() {
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem('savedMovies')) || []
  ); // берем фильмы из базы
  const [isLoading, setIsLoading] = useState(false); // состояние загрузки фильмов из базы
  const [error, setError] = useState('');

  const handleSearch = (query, isShort) => {
    setIsLoading(true);
    setError('');
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')); // ?????
    const filtered = searchFilter(savedMovies, query, isShort);
    if (filtered.length === 0) {
      setError('Ничего не найдено');
    }
    setMovies(filtered);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    mainApi
      .getUserMovies()
      .then((savedMovies) => {
        const user = localStorage.getItem('userId');
        const userMovies = savedMovies.filter((film) => film.owner === user);
        localStorage.setItem('savedMovies', JSON.stringify(userMovies));
        setIsLoading(false);
        if (savedMovies.length === 0) {
          setError('Вы еще ничего не добавили в избранное');
        }
      })
      // .catch(() => setTooltipMessage(NO_CONNECTION_MESSAGE));
      .catch(() => console.log('ошибочка'));
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
