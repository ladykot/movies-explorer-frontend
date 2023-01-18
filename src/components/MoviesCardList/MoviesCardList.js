import React from 'react';
import MoviesCard from 'components/MoviesCard/MoviesCard';
import './MoviesCardList.css';

// данные карточек пока что получаем из макета

function MoviesCardList({ cards, onCardLike, onCardClick }) {
  // обработчик кнопки Еще
  const showMoreMovies = () => {};

  return (
    <section className="movies__cards-section">
      {/* проходим по массиву с карточками */}
      {cards.map((card) => (
        <MoviesCard
          onCardLike={onCardLike}
          onCardClick={onCardClick}
          card={card}
          key={card._id}
        />
      ))}
      <button className="movies__more-button" onClick={showMoreMovies}>
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
