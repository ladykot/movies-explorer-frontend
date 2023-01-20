import React from 'react';
import { useLocation } from 'react-router-dom';
import link from '../../images/pic__card.png';
import './MoviesCard.css';
import { matchPath } from 'react-router';

function MoviesCard({ card, onCardLike, onCardClick }) {
  // обработчик клика на Сердечко
  // onCardLike - свойство карточки, и обработчик извне
  function handleLikeClick() {
    // onCardLike();
    console.log('like!');
  }

  // для проверки url и установки нужной кнопки Лайка на карточке
  const location = useLocation();
  const isLiked = true; // при false отображаются серые сердечки

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
            className="movies-card__like movies-card__like_type_selected"
            aria-label="лайк"
            onClick={handleLikeClick}
          ></button>
        ) : (
          <button
            type="button"
            className={isLiked ? "movies-card__like" : "movies-card__like movies-card__like_type_notliked"}
            aria-label="лайк"
            onClick={handleLikeClick}
          ></button>
        )}
      </div>
    </div>
  );
}

export default MoviesCard;
