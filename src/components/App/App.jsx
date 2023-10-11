import "./App.css";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from '../Header/Header';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from '../Footer/Footer';
import PageNotFound from "../PageNotFound/PageNotFound";
import Profile from "../PageWithForm/Profile/Profile";
import Register from "../PageWithForm/Register/Register";
import Login from "../PageWithForm/Login/Login";
import { HEADERLOCATION, FOOTERLOCATION } from "../../utils/config/config";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


const App = () => {
  const location = useLocation();

  const shouldShowHeader = HEADERLOCATION.some(
    (item) => location.pathname === item
  );
  const shouldShowFooter = FOOTERLOCATION.some(
    (item) => location.pathname === item
  );

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          {shouldShowHeader && <Header isLoggedIn={isLoggedIn} />}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/saved-movies" element={<SavedMovies />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          {shouldShowFooter && <Footer />}
        </CurrentUserContext.Provider>
      </div>
    </div>
  )
}

export default App;