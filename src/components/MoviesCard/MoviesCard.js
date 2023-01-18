import React from 'react';
import link from '../../images/pic__card.png';
import './MoviesCard.css';

function MoviesCard({ card, onCardLike, onCardClick }) {
  // обработчик клика на Сердечко
  // onCardLike - свойство карточки, и обработчик извне
  function handleLikeClick() {
    // onCardLike();
    console.log('like!')
  }

  console.log(card)

  // обработчик клика по карточке для перехода на терейлер youtube
  function handleImageClick() {
    onCardClick();
  }

  return (
    <div className="movies-cards__item">
      <div className="movies-card__item-content">
        <img
          className="movies-card__pic"
          src={link}
          onClick={handleImageClick}
          alt=''
        />
        <div className="movies-card__text">
          <h2 className="movies-card__title">{card.title}</h2>
          <p className="movies-card__description">{card.duration}</p>
        </div>

        <button
          type="button"
          // className={`movies-cards__union ${
          //   isLiked && 'movies-cards__union_active'
          // }`}
          className="movies-card__like"
          aria-label="лайк"
          onClick={handleLikeClick}
        ></button>
      </div>
    </div>
  );
}

export default MoviesCard;
