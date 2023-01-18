import React from 'react';
import MoviesCard from 'components/MoviesCard/MoviesCard';
import './MoviesCardList.css';

// данные карточек пока что получаем из макета


function MoviesCardList(movies, onCardLike) {

  // обработчик кнопки Еще
  const showMoreMovies = () => {
  }

  return (
    <section className="movies__cards-section">
          {/* {movies.map(() => ( */}
              <MoviesCard onCardLike={onCardLike}/>
              <MoviesCard onCardLike={onCardLike}/>
              <MoviesCard onCardLike={onCardLike}/>
              <MoviesCard onCardLike={onCardLike}/>
          {/* ))} */}
      <button className="movies__more-button" onClick={showMoreMovies}>
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
