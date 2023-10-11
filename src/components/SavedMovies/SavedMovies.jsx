import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import cardImage from '../../images/card_image.jpg';

const SavedMovies = () => {

  return (
    <main className="content">
      <section className='saved-movies'>
        <SearchForm />
        <MoviesCardList>
          <MoviesCard
            link={cardImage}
            alt="Карточка"
            title="По волнам: Искусство звука в кино"
            duration="1ч 17м"
          />
          <MoviesCard
            link={cardImage}
            alt="Карточка"
            title="По волнам: Искусство звука в кино"
            duration="1ч 17м"
          />
          <MoviesCard
            link={cardImage}
            alt="Карточка"
            title="По волнам: Искусство звука в кино"
            duration="1ч 17м"
          />
        </MoviesCardList>
      </section >
    </main>
  )
}

export default SavedMovies;