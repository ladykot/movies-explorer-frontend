import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from 'components/FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ handleSearch }) {
  const [shorts, setShorts] = useState(false); // состояние чекбокса для выбора короткометражек
  const [placeholderContent, setPlaceholderContent] = useState('Название'); // текст плейсхолдера после запроса нужно менять
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false); // состояние ошибок инпутов
  const { pathname } = useLocation();

  const handeleInput = (evt) => {
    setInputValue(evt.target.value);
  };

  // выбрать короткометражки
  const handelCheckbox = () => {
    setShorts(!shorts);
    handleSearch(inputValue, !shorts);
    if (pathname === '/movies') {
      localStorage.setItem('shorts', !shorts);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!inputValue) {
      setError(true);
      evt.target.elements['search-query'].focus();
      return;
    }
    setError(false);
    setPlaceholderContent('Movie');
    if (pathname === '/movies') {
      localStorage.setItem('query', inputValue);
    }
    handleSearch(inputValue, shorts);
  };

  // при перезагрузке страницы проверим есть ли запрос уже в localStorage
  // если есть - вставим в поиск и выведем
  useEffect(() => {
    if (pathname === '/movies') {
      const savedInputValue = localStorage.getItem('query');
      const savedShorts = JSON.parse(localStorage.getItem('shorts'));
      if (savedInputValue) {
        setInputValue(savedInputValue);
      }
      if (savedShorts) {
        setShorts(savedShorts);
      }
      if (savedInputValue || savedShorts === true) {
        handleSearch(savedInputValue, savedShorts);
      }
    }
  }, []);

  return (
    <div className="search-container">
      <form
        className="search-form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <input
          type="text"
          id="search-query"
          name="search-query"
          placeholder={placeholderContent}
          className="search-form__input"
          onChange={handeleInput}
          required
          value={inputValue}
        />
        <button
          type="submit"
          className="search-form__button hover"
          aria-label="Поиск"
        >
          Поиск
        </button>
        {error ? (
          <span className="search-form__inputs-error">
            Введите ключевое слово
          </span>
        ) : (
          <span className="search-form__inputs-error search-form__inputs-error_hidden">
            Введите ключевое слово
          </span>
        )}
      </form>
      <FilterCheckbox value={shorts} onChange={handelCheckbox} />
      <div className="search-container__line"></div>
    </div>
  );
}

export default SearchForm;
