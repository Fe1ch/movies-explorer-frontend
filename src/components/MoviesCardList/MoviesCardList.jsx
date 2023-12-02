import './MoviesCardList.css';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';
import InfoMessage from '../InfoMessage/InfoMessage';
import {
  MOVIES_ADD_DESKTOP,
  MOVIES_ADD_MOBILE,
  NOTHING_FOUND,
  SCREEN_SIZE_DESKTOP,
  SCREEN_SIZE_MAX_TABLET,
  SCREEN_SIZE_MIN_TABLET,
  SCREEN_SIZE_MOBILE,
  SERVER_ERROR,
  SHOW_MOVIES_DESKTOP,
  SHOW_MOVIES_MOBILE,
  SHOW_MOVIES_TABLET
} from '../../utils/config/config';

const MoviesCardList = ({ filteredMovies, savedMovies, onSaveMovie, onDeleteMovie, isSavedFilms, isRequestError, isNotFound, isLoading, isLoadingMoviesSearching }) => {

  const location = useLocation().pathname;
  // количество показываемых карточек
  const [shownMoviesQuantity, setShownMoviesQuantity] = useState(0);
  const [numberMoviesToAdd, setNumberMoviesToAdd] = useState(0)

  // устанавливаем видимое количество карточек на странице в зависимости от разрешения экрана
  const setShownQuantity = () => {
    const display = window.innerWidth;
    if (display > SCREEN_SIZE_DESKTOP) {
      setShownMoviesQuantity(SHOW_MOVIES_DESKTOP);
      setNumberMoviesToAdd(0)
    } else if (display > SCREEN_SIZE_MIN_TABLET && display < SCREEN_SIZE_MAX_TABLET) {
      setShownMoviesQuantity(SHOW_MOVIES_TABLET);
      setNumberMoviesToAdd(0)
    } else if (display < SCREEN_SIZE_MOBILE) {
      setShownMoviesQuantity(SHOW_MOVIES_MOBILE);
      setNumberMoviesToAdd(0)
    }
  }
  // количество карточек устанавливается при открытии страницы
  useEffect(() => {
    setShownQuantity();
  }, [isLoadingMoviesSearching]);


  // откладываем работу функции в случае изменения ширины экрана в отладчике
  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', setShownQuantity);
    }, 500);
    return () => {
      window.removeEventListener('resize', setShownQuantity);
    }
  }, []);

  // функция подгруздки карточек в зависимости от разрешения экрана
  const loadMoreMovies = () => {
    const display = window.innerWidth;
    if (display > SCREEN_SIZE_DESKTOP) {
      setNumberMoviesToAdd(numberMoviesToAdd + MOVIES_ADD_DESKTOP);
    } else if (display > SCREEN_SIZE_MIN_TABLET && display < SCREEN_SIZE_MAX_TABLET) {
      setNumberMoviesToAdd(numberMoviesToAdd + MOVIES_ADD_MOBILE);
    } else if (display < SCREEN_SIZE_MOBILE) {
      setNumberMoviesToAdd(numberMoviesToAdd + MOVIES_ADD_MOBILE);
    }
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {!isLoading && !isRequestError && !isNotFound && (
        <>
          {location === '/saved-movies' ? (
            <>
              <ul className='cards__list'>
                {filteredMovies.map((movie) => {
                  return (
                    <MoviesCard
                      movie={movie}
                      key={isSavedFilms ? movie._id : movie.id}
                      onSaveMovie={onSaveMovie}
                      onDeleteMovie={onDeleteMovie}
                      isSavedFilms={isSavedFilms}
                      savedMovies={savedMovies}
                    />
                  );
                })}

              </ul>
            </>
          ) : (
            <>
              <ul className='cards__list'>
                {filteredMovies.slice(0, shownMoviesQuantity + numberMoviesToAdd).map(movie => {
                  return (
                    <MoviesCard
                      movie={movie}
                      key={isSavedFilms ? movie._id : movie.id}
                      onSaveMovie={onSaveMovie}
                      onDeleteMovie={onDeleteMovie}
                      isSavedFilms={isSavedFilms}
                      savedMovies={savedMovies}
                    />
                  );
                })}
              </ul>
              <div className="movies__button-container">
                {filteredMovies.length > numberMoviesToAdd ? (
                  <button onClick={loadMoreMovies} type="button" className="movies__load-button">Ещё</button>
                ) : ''}
              </div>
            </>
          )}
        </>
      )}
      {isNotFound && !isLoading && <InfoMessage message={NOTHING_FOUND} />}
      {isRequestError && !isLoading && <InfoMessage message={SERVER_ERROR} />}
    </section >
  );
}

export default MoviesCardList;