import React from 'react';
import link from '../../images/pic__card.png';
import './MoviesCard.css';

function MoviesCard({ onCardLike }) {
  // обработчик клика на Сердечко
  // onCardLike - свойство карточки, и обработчик извне
  function handleLikeClick() {
    onCardLike();
  }

  return (
    <div className="movies-cards__item">
      <div className="movies-card__item-content">
        <img className="movies-card__pic" src={link} />
        <div className='movies-card__text'>
          <h2 className="movies-card__title">33 слова о дизайне</h2>
          <p className='movies-card__description'>1ч 42м</p>
        </div>

        <button
          type="button"
          // className={`movies-cards__union ${
          //   isLiked && 'movies-cards__union_active'
          // }`}
          className='movies-card__like'
          aria-label="лайк"
          onClick={handleLikeClick}
        ></button>
      </div>
    </div>
  );
}

export default MoviesCard;
