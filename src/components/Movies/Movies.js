import React, { useState } from 'react';
import SearchForm from 'components/SearchForm/SearchForm';
import MoviesCardList from 'components/MoviesCardList/MoviesCardList';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Preloader from 'components/Preloader/Preloader';
import './Movies.css';

function Movies() {
  const [loading, setLoading] = useState(false); // состояние загрузки фильмов из базы

  return (
    <>
      <Header />
      <div className="movies">
        <SearchForm />
        {/* {loading ? (
        <Preloader />
      ) : (
        <MoviesCardList movies={movies} errorMessage={errorMessage} />
      )} */}

        <Preloader />
        
        {/* <MoviesCardList /> */}
      </div>

      <Footer />
    </>
  );
}

export default Movies;
