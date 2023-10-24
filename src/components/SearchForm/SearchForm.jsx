import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { KEYWORD_REQUIRED, MOVIE_TITLE } from '../../utils/config/config';

const SearchForm = ({ onSearch, onFilter, isCheckboxActive }) => {

  const location = useLocation().pathname;
  const [searchValue, setSearchValue] = useState("");
  const [isError, setIsError] = useState(false);

  // если мы на странице фильмов, получаем из хранилища поисковый запрос
  useEffect(() => {
    if (location === '/movies') {
      setSearchValue(localStorage.getItem('movieSearch'));
    }
    if (location === '/saved-movies') {
      setSearchValue('');
    }
  }, [location]);


  const changeSearch = (e) => {
    setSearchValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim().length === 0) {
      setIsError(true);
    } else {
      setIsError(false);
      onSearch(searchValue);
    }
  }

  return (
    <section className="search-section">
      <form
        className="search-section__form"
        name="search-movie"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="search-section__form-container">
          <input
            className={`search-section__input ${isError && 'search-section__input_error'
              }`}
            name='search'
            type="text"
            value={searchValue || ""}
            placeholder={isError ? KEYWORD_REQUIRED : MOVIE_TITLE}
            onChange={changeSearch}
            minLength='1'
            required

          />
          <button
            className="search-section__submit-button"
            type='submit'
          />
        </div>
        <FilterCheckbox
          title="Короткометражки"
          onFilter={onFilter}
          isActive={isCheckboxActive}
        />
        <div className='search-section__line' />
      </form>
    </section>
  );
}

export default SearchForm;