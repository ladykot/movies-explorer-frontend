import React from 'react';
import HeaderAuth from 'components/HeaderAuth/HeaderAuth';
import SearchForm from 'components/SearchForm/SearchForm';
import MoviesCardList from 'components/MoviesCardList/MoviesCardList';
import Footer from 'components/Footer/Footer';

function Movies() {
  return (
    <>
      <HeaderAuth />
      <SearchForm />
      <Preloader />
      <MoviesCardList />
      <Footer />
    </>
  );
}

export default Movies;
