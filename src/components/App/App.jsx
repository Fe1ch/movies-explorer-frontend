import "./App.css";

import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { HEADER_LOCATION, FOOTER_LOCATION } from "../../utils/config/config";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from '../Header/Header';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../PageWithForm/Profile/Profile";
import Register from "../PageWithForm/Register/Register";
import Login from "../PageWithForm/Login/Login";
import Footer from '../Footer/Footer';
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import * as mainApi from '../../utils/Api/MainApi';
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";

const App = () => {

  const navigate = useNavigate();
  const location = useLocation().pathname;

  const shouldShowHeader = HEADER_LOCATION.some(
    (item) => location === item
  );
  const shouldShowFooter = FOOTER_LOCATION.some(
    (item) => location === item
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isServerMessageError, setIsServerMessageError] = useState('');
  const [isServerMessageComplete, setIsServerMessageComplete] = useState('');
  const [isDisabledInput, setIsDisabledInput] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);



  useEffect(() => {
    isLoggedIn && Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
      .then(([data, movies]) => {
        setCurrentUser(data)
        setSavedMovies(movies.reverse());
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
      })
  }, [isLoggedIn])

  const handleRegistration = (name, email, password) => {
    setIsDisabledInput(true)
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin(email, password)
        }
      })
      .catch((err) => {
        setIsServerMessageError(err.message)
      })
      .finally(() => {
        setIsDisabledInput(false)
      })
  }

  const handleLogin = (email, password) => {
    setIsDisabledInput(true)
    mainApi
      .login(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        setIsServerMessageError(err.message)
      })
      .finally(() => {
        setIsDisabledInput(false)
      })

  }

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/', { replace: true });
  };

  const handleCheckToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi
        .checkToken(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            navigate(location)
          }
        })
        .catch((err) => {
          console.log(err.status)
          handleLogout();
        })
    }
  };

  useEffect(() => {
    handleCheckToken();
  }, []);

  const handleUpdateProfile = ({ name, email }) => {
    setIsDisabledInput(true)
    mainApi
      .updateProfile({ name, email })
      .then(() => {
        setCurrentUser({ name, email });
        setIsServerMessageComplete('Данные успешно обновлены');
      })
      .catch((err) => {
        setIsServerMessageError(err.message)
      })
      .finally(() => {
        setIsDisabledInput(false)
      })
  }

  const handleSaveMovie = (movieCard) => {
    mainApi
      .saveMoviesCard(movieCard)
      .then((movieCard) => {
        setSavedMovies([movieCard, ...savedMovies])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDeleteMovie = (movie) => {
    // если карточка пришла из movies
    if (!movie._id) {
      const movieToDelete = savedMovies.find((mov) => {
        return mov.movieId === movie.id;
      });
      mainApi
        .deleteMoviesCard(movieToDelete._id)
        .then(() => {
          setSavedMovies(
            savedMovies.filter((mov) => {
              return mov._id !== movieToDelete._id;
            })
          );
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      // если карточка пришла из saved-movies
      mainApi
        .deleteMoviesCard(movie._id)
        .then(() => {
          setSavedMovies(
            savedMovies.filter((mov) => {
              return mov._id !== movie._id;
            })
          );
        })
        .catch((err) => {
          console.log(err)
        })
    }
  };

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          {shouldShowHeader && <Header isLoggedIn={isLoggedIn} />}
          <Routes>
            <Route
              path="/"
              element={
                <Main />
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={Movies}
                  isLoggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  onSaveMovie={handleSaveMovie}
                  onDeleteMovie={handleDeleteMovie}
                />
              } />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  isLoggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  onDeleteMovie={handleDeleteMovie}
                />} />
            <Route
              path="/signup"
              element={<Register
                handleRegistration={handleRegistration}
                isServerMessageError={isServerMessageError}
                isDisabledInput={isDisabledInput}

              />} />
            <Route
              path="/signin"
              element={<Login
                handleLogin={handleLogin}
                isServerMessageError={isServerMessageError}
                isDisabledInput={isDisabledInput}
              />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  isLoggedIn={isLoggedIn}
                  handleLogout={handleLogout}
                  handleUpdateProfile={handleUpdateProfile}
                  isServerMessageError={isServerMessageError}
                  setIsServerMessageError={setIsServerMessageError}
                  isServerMessageComplete={isServerMessageComplete}
                  setIsServerMessageComplete={setIsServerMessageComplete}
                  isDisabledInput={isDisabledInput}
                />} />
            <Route
              path="*"
              element={
                <PageNotFound />
              } />
          </Routes>
          {shouldShowFooter && <Footer />}
          <ScrollToTopButton />
        </CurrentUserContext.Provider>
      </div>
    </div>
  )
}

export default App;