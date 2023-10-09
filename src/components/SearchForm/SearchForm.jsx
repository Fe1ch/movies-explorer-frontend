import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {

  return (
    <section className="search-section">
      <form className="search-section__form" name="search-movie">
        <div className="search-section__form-container">
          <input
            className="search-section__input"
            type="text"
            placeholder="Фильм"
            required
          />
          <button className="search-section__submit-button" />
        </div>
        <FilterCheckbox title="Короткометражки" />
        <div className='search-section__line' />
      </form>
    </section>
  );
}

export default SearchForm;