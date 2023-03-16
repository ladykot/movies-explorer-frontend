import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from 'components/MoviesCard/MoviesCard';
import './MoviesCardList.css';
import {
  MAX_MOVIES_1280,
  MAX_MOVIES_768,
  MAX_MOVIES,
  MAX_MOVIES_STEP_1280,
  MAX_MOVIES_STEP_1000,
  MAX_MOVIES_STEP,
} from '../../utils/constants';

function MoviesCardList({ movies, error }) {
  const [maxMovies, setMaxMovies] = useState(0); //
  const [step, setStep] = useState(0);
  const location = useLocation();



  // обработчик кнопки Еще
  const showMoreMovies = () => {
    setMaxMovies(maxMovies + step);
  };

  // адаптивная схема расположения карточек
  const setMoviesRules = () => {
    const width = window.innerWidth;
    if (location.pathname === '/saved-movies') {
      setMaxMovies(movies.length);
    }
    if (width <= 720) {
      setMaxMovies(MAX_MOVIES);
      setStep(MAX_MOVIES_STEP);
    } else if (width <= 1000) {
      setMaxMovies(MAX_MOVIES_768);
      setStep(MAX_MOVIES_STEP);
    } else if (width <= 1279) {
      setMaxMovies(MAX_MOVIES_1280);
      setStep(MAX_MOVIES_STEP_1000);
    } else {
      setMaxMovies(MAX_MOVIES_1280);
      setStep(MAX_MOVIES_STEP_1280);
    }
  };

  useEffect(() => {
    setMoviesRules();
    window.addEventListener('resize', () => {
      setTimeout(() => {
        setMoviesRules();
      }, 500);
    });
  }, []);

  return (
    <section className="movies__cards-section">
      {error ? (
        <span className='movies__error'>{error}</span>
      ) : (
        <>
          {movies.map((movie, index) => {
            if (index < maxMovies) {
              return (
                <MoviesCard key={movie.id || movie.movieId} movie={movie} />
              );
            }
            return null;
          })}
        </>
      )}
      {movies.length > maxMovies && location.pathname !== '/saved-movies' && (
        <button className="movies__more-button hover" onClick={showMoreMovies}>
          Еще
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
