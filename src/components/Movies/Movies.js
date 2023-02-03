import React, { useState } from 'react';
import SearchForm from 'components/SearchForm/SearchForm';
import MoviesCardList from 'components/MoviesCardList/MoviesCardList';
import Preloader from 'components/Preloader/Preloader';
import './Movies.css';
import Header from 'components/Header/Header';

function Movies({ cards, onCardLike, onCardClick }) {
  const [isLoading, setLoading] = useState(false); // состояние загрузки фильмов из базы

  // обработчик кнопки Найти
  const handleButtonSearch = () => {
    setLoading(true);
  };

  // обработчик кнопки Еще

  return (
    
    <div className="movies">
      <SearchForm onClick={handleButtonSearch} />
      {!isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          cards={cards}
          onCardLike={onCardLike}
          onCardClick={onCardClick}
        />
      )}
    </div>
  );
}

export default Movies;
