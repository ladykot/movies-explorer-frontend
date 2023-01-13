import React, { useState } from 'react';
import FilterCheckbox from 'components/FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  // состояние чекбокса для выбора короткометражек
  const [shorts, setShorts] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const handleSubmit = () => {
    // если в инпутах есть значение - отобразить только короткометражки
    // и вызвать функцию handleSearch
  };

  const handelCheckbox = () => {
    // меняем на противоположное
    setShorts(!shorts);
  };
  
  const handeleInput = (evt) => {
    setInputValue(evt.target.value);
  }

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="title-input"
          name="movie"
          placeholder="Название"
          className="search-form__input"
          onChange={handeleInput}
          required
        />
        <button
          type="submit"
          className="search-form__button"
          aria-label="Поиск"
        >
          Поиск
        </button>
      </form>
      <FilterCheckbox value={shorts} onChange={handelCheckbox} />
      <div className="search-container__line"></div>
    </div>
  );
}

export default SearchForm;
