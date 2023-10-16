import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from '../Footer/Footer';
import PageNotFound from "../PageNotFound/PageNotFound";
import Profile from "../PageWithForm/Profile/Profile";
import Register from "../PageWithForm/Register/Register";
import Login from "../PageWithForm/Login/Login";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import { HEADERLOCATION, FOOTERLOCATION } from "../../utils/config/config";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as mainApi from '../../utils/Api/MainApi';
import * as moviesApi from '../../utils/Api/MoviesApi'

const App = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const shouldShowHeader = HEADERLOCATION.some(
    (item) => location.pathname === item
  );
  const shouldShowFooter = FOOTERLOCATION.some(
    (item) => location.pathname === item
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isServerMessageError, setIsServerMessageError] = useState('');
  const [isServerMessageComplete, setIsServerMessageComplete] = useState(false);
  const [isDisabledInput, setIsDisabledInput] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isLoggedIn && token) {
      isLoggedIn && Promise.all([mainApi.getUserInfo(token), mainApi.getSavedMovies(token)])
        .then(([data, movies]) => {
          setCurrentUser(data)
          setSavedMovies(movies.reverse());
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          // setIsPreloading(false)
        })
    }
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
        navigate('/movies');
        setIsServerMessageError('Профиль успешно обновлён!')
      })
      .catch((err) => {
        setIsServerMessageError(err.message)
      })
      .finally(() => {
        setIsDisabledInput(false)
      })

  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleCheckToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi
        .checkToken(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            navigate('/movies', { replace: true })
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
    const token = localStorage.getItem('token');
    setIsDisabledInput(true)
    mainApi
      .updateProfile({ name, email, token })
      .then(() => {
        setCurrentUser({ name, email });
        setIsServerMessageComplete(true);
        setTimeout(() => {
          setIsServerMessageComplete(false);
        }, 4000);
      })
      .catch((err) => {
        setIsServerMessageError(err.message)
      })
      .finally(() => {
        setIsDisabledInput(false)
      })
  }

  const saveMovie = (movieCard) => {
    const token = localStorage.getItem('token');
    mainApi
      .saveMoviesCard(movieCard, token)
      .then((savedCard) => {
        setSavedMovies([savedCard, ...savedMovies])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteMovie = (movieCard) => {
    const token = localStorage.getItem('token');
    mainApi
      .deleteMoviesCard(movieCard._id, token)
      .then(() => {
        setSavedMovies((state) => state.filter((card) => card !== movieCard))
      })
      .catch((err) => {
        console.log(err)
      })
  }


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
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
                />
              } />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  isLoggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
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
                  isServerMessageComplete={isServerMessageComplete}
                  isDisabledInput={isDisabledInput}
                />} />
            <Route
              path="*"
              element={
                <PageNotFound />
              } />
          </Routes>
          {shouldShowFooter && <Footer />}
        </CurrentUserContext.Provider>
      </div>
    </div>
  )
}

export default App;