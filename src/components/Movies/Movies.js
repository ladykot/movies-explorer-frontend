import React from 'react';
import SearchForm from 'components/SearchForm/SearchForm';
import MoviesCardList from 'components/MoviesCardList/MoviesCardList';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';

function Movies() {
  return (
    <>
      <Header />
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />
      <Footer />
    </>
  );
}

export default Movies;
