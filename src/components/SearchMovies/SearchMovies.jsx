import Movies from "../Movies/Movies";

const SearchMovies = ({ savedMovies, onSaveMovie, onDeleteMovie, isSavedFilms }) => {
  return (
    <Movies
      savedMovies={savedMovies}
      onSaveMovie={onSaveMovie}
      onDeleteMovie={onDeleteMovie}
      isSavedFilms={isSavedFilms}
    />
  )
}

export default SearchMovies;