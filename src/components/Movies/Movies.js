import React, { useState } from 'react';
import SearchForm from 'components/SearchForm/SearchForm';
import MoviesCardList from 'components/MoviesCardList/MoviesCardList';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Preloader from 'components/Preloader/Preloader';
import './Movies.css';

function Movies(onCardLike) {
  // начальное состояние фильмов - это пустой список
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false); // состояние загрузки фильмов из базы

  const handleButtonSearch = () => {
    setLoading(!loading)
  }

  return (
    <>
      <Header />
      <div className="movies">
        <SearchForm />
        {loading ? (
        <Preloader />
      ) : (
        <MoviesCardList movies={movies} onCardLike={onCardLike}/>
      )}
        {/* <Preloader /> */}
        
        {/* <MoviesCardList /> */}
      </div>

      <Footer />
    </>
  );
}

export default Movies;
