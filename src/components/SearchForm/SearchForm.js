import React, { useState } from 'react';
import FilterCheckbox from 'components/FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({onClick}) {
  // состояние чекбокса для выбора короткометражек
  const [shorts, setShorts] = useState(false);

  // состояние инпута
  const [inputValue, setInputValue] = useState("");

  // 

  const handleSubmit = (e) => {
    e.preventDefault(); 
  };

  const handelCheckbox = () => {
    // меняем на противоположное
    setShorts(!shorts);
  };
  
  const handeleInput = (e) => {
    setInputValue(e.target.value);
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
          type="button"
          onClick={onClick}
          className="search-form__button hover"
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
