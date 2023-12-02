import './SavedMovies.css';

import { useEffect, useState } from 'react';
import { filterDuration, filterMovies } from '../../utils/hooks/MoviesFilter';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ savedMovies, onDeleteMovie }) => {
  // массив фильмов, отфильтрованный по запросу и длительности
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  // статус состояния чекбокса короткометражек
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);
  // ошибка при отсутствии найденных фильмов
  const [isNotFound, setIsNotFound] = useState(false);
  // запрос пользователя
  const [searchQuery, setSearchQuery] = useState('');

  // меняем запрос в поисковой строке
  function onSearchMovies(query) {
    setSearchQuery(query);
  }

  // переключаем состояние чекбокса
  function handleShortMovies() {
    setIsCheckboxActive(!isCheckboxActive);
  }

  // получаем отфильтрованные фильмы
  useEffect(() => {
    const moviesList = filterMovies(savedMovies, searchQuery);
    setFilteredMovies(isCheckboxActive ? filterDuration(moviesList) : moviesList);
  }, [savedMovies, isCheckboxActive, searchQuery]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  return (
    <main>
      <section className="saved-movies">
        <SearchForm
          onSearch={onSearchMovies}
          onFilter={handleShortMovies} />
        <MoviesCardList
          savedMovies={savedMovies}
          isNotFound={isNotFound}
          isSavedFilms={true}
          filteredMovies={filteredMovies}
          onDeleteMovie={onDeleteMovie}
        />
      </section>
    </main>
  )
}

export default SavedMovies;