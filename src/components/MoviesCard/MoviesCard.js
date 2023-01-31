import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import link from '../../images/pic__card.png';
import './MoviesCard.css';
import '../../vendor/hover.css';

function MoviesCard({ card, onCardLike, onCardClick }) {
  const [isLiked, setIsLiked] = useState(false);
  // обработчик клика на Сердечко
  // onCardLike - свойство карточки, и обработчик извне
  function handleLikeClick() {
    // onCardLike();
    setIsLiked(!isLiked);
  }

  // для проверки url и установки нужной кнопки Лайка на карточке
  const location = useLocation();

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
          alt=""
        />
        <div className="movies-card__text">
          <h2 className="movies-card__title">{card.title}</h2>
          <p className="movies-card__description">{card.duration}</p>
        </div>
        {location.pathname === '/saved-movies' ? (
          <button
            type="button"
            className="movies-card__like movies-card__like_type_selected hover"
            aria-label="лайк"
            onClick={handleLikeClick}
          ></button>
        ) : (
          <button
            type="button"
            className={isLiked ? "movies-card__like hover" : "movies-card__like movies-card__like_type_notliked hover"}
            aria-label="лайк"
            onClick={handleLikeClick}
          ></button>
        )}
      </div>
    </div>
  );
}

export default MoviesCard;
