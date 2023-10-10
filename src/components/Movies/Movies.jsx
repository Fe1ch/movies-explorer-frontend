import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import cardImage from '../../images/card_image.jpg';

const Movies = () => {

  return (
    <main className="content">
      <section className="movies">
        <SearchForm />
        <MoviesCardList>
          <MoviesCard
            link={cardImage}
            alt="Карточка"
            title="По волнам: Искусство звука в кино"
            duration="1ч 17м"
          />
        </MoviesCardList>
        <div className="movies__button-container">
          <button
            className="movies__load-button"
            type='button'
          >
            Ещё
          </button>
        </div>
      </section>
    </main>
  );
}

export default Movies;