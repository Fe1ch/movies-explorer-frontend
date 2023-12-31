import './Movies.css';

import { useEffect, useState } from 'react';
import { filterDuration, filterMovies } from "../../utils/hooks/MoviesFilter";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import * as moviesApi from '../../utils/Api/MoviesApi'

const Movies = ({ savedMovies, onSaveMovie, onDeleteMovie }) => {

  // статус загрузки изначального массива фильмов
  const [isLoading, setIsLoading] = useState(false);
  // массив фильмов, отфильтрованный по запросу
  const [initialMovies, setInitialMovies] = useState([]);
  // массив фильмов, отфильтрованный по запросу и длительности
  const [filteredMovies, setFilteredMovies] = useState([]);
  // статус состояния чекбокса короткометражек
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);
  // ошибка при запросе к серверу
  const [isRequestError, setIsRequestError] = useState(false);
  // ошибка при отсутствии найденных фильмов
  const [isNotFound, setIsNotFound] = useState(false);
  // статус загрузки нового поиска фильмов
  const [isLoadingMoviesSearching, setIsLoadingMoviesSearching] = useState(false);

  // получаем отфильтрованный массив фильмов
  const getFilterMovies = (movies, searchQuery, isCheckbox) => {
    //фильтруем полученные фильмы по запросу в поисковой строке
    const moviesList = filterMovies(movies, searchQuery, isCheckbox);
    setInitialMovies(moviesList);
    //если чекбокс включен, фильтруем полученные фильмы по длительности
    setFilteredMovies(isCheckbox ? filterDuration(moviesList) : moviesList);
    // записываем в локальное хранилище
    localStorage.setItem('movies', JSON.stringify(moviesList));
    localStorage.setItem('allMovies', JSON.stringify(movies));
  }

  // фильтруем фильмы в зависимости от состояния чекбокса короткометражек
  const handleFilterCheckbox = () => {
    setIsCheckboxActive(!isCheckboxActive);
    if (!isCheckboxActive) {
      if (filterDuration(initialMovies).length === 0) {
        setFilteredMovies(filterDuration(initialMovies));
      } else {
        setFilteredMovies(filterDuration(initialMovies));
      }
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem('shortMovies', !isCheckboxActive);
  }

  const handleSearchMovies = (searchQuery) => {
    setIsLoadingMoviesSearching(searchQuery)
    localStorage.setItem('movieSearch', searchQuery);
    localStorage.setItem('shortMovies', isCheckboxActive);
    if (localStorage.getItem('allMovies')) {
      console.log('Показываем фильмы из загруженных с сервера');
      const movies = JSON.parse(localStorage.getItem('allMovies'));
      getFilterMovies(movies, searchQuery, isCheckboxActive);
    } else {
      console.log('Загружаем фильмы с сервера');
      setIsLoading(true);
      moviesApi.getMovies()
        .then((cardsData) => {
          getFilterMovies(cardsData, searchQuery, isCheckboxActive);
          setIsRequestError(false);
        })
        .catch((err) => {
          setIsRequestError(true);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  // постановка состояния чекбокса при открытии страницы
  useEffect(() => {
    if (localStorage.getItem('shortMovies') === 'true') {
      setIsCheckboxActive(true);
    } else {
      setIsCheckboxActive(false);
    }
  }, []);

  // загрузка найденных фильмов при открытии страницы
  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setInitialMovies(movies);
      if (localStorage.getItem('shortMovies') === 'true') {
        setFilteredMovies(filterDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  // постановка поискового запроса при открытии страницы и последующих запросах
  useEffect(() => {
    if (localStorage.getItem('movieSearch')) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  return (
    <main className="content">
      <section className="movies">
        <SearchForm
          onSearch={handleSearchMovies}
          onFilter={handleFilterCheckbox}
          isCheckboxActive={isCheckboxActive}
        />
        <MoviesCardList
          savedMovies={savedMovies}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          filteredMovies={filteredMovies}
          isSavedFilms={false}
          isRequestError={isRequestError}
          isNotFound={isNotFound}
          isLoading={isLoading}
          isLoadingMoviesSearching={isLoadingMoviesSearching}
        />
      </section>
    </main>
  );
}

export default Movies;