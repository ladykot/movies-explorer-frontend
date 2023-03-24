import React from 'react';
import './InfoTooltip.css';
import union from '../../images/Union.svg';
import unionErr from '../../images/Union_err.svg';

function InfoTooltip({ isOpen, onClose, isSucess, textError }) {
  return (
    <section
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      onClick={onClose}
    >
      <div
        className={`popup__container`}
        onClick={(e) => {
          e.stopPropagation(); // Прекращает дальнейшую передачу текущего события.
        }}
      >
        <button
          onClick={onClose}
          type="button"
          className="popup__button-close hover"
        ></button>
        <form className="popup__form-info">
          {isSucess ? (
            <img className="popup__info-image" src={union} alt="Успех!" />
          ) : (
            <img className="popup__info-image" src={unionErr} alt="Ошибка" />
          )}
          <h3 className="popup__info-title">{textError}</h3>
        </form>
      </div>
    </section>
  );
}

export default InfoTooltip;
