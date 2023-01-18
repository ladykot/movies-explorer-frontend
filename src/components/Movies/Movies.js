import React, { useState } from 'react';
import SearchForm from 'components/SearchForm/SearchForm';
import MoviesCardList from 'components/MoviesCardList/MoviesCardList';
import Preloader from 'components/Preloader/Preloader';
import './Movies.css';

function Movies({ cards, onCardLike, onCardClick }) {
  const [loading, setLoading] = useState(false); // состояние загрузки фильмов из базы
  console.log(cards)

  const handleButtonSearch = () => {
    setLoading(!loading);
  };

  return (
    <>
      <div className="movies">
        <SearchForm />
        {loading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            cards={cards}
            onCardLike={onCardLike}
            onCardClick={onCardClick}
          />
        )}
        {/* <Preloader /> */}
      </div>
    </>
  );
}

export default Movies;
