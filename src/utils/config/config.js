const HEADER_LOCATION = ['/', '/movies', '/saved-movies', '/profile'];
const FOOTER_LOCATION = ['/', '/movies', '/saved-movies'];

const MAIN_API_URL = 'https://api.movies.fe1ch.nomoredomainsrocks.ru';
const CARDS_IMAGE_API_URL = "https://api.nomoreparties.co";

const MOVIES_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const NOTHING_FOUND = 'Ничего не найдено';
const SERVER_ERROR = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.';
const PROFILE_UPDATE_ERROR = 'При обновлении профиля произошла ошибка.';
const PROFILE_UPDATE_COMPLETED = 'Профиль успешно обновлен.';
const KEYWORD_REQUIRED = 'Нужно ввести ключевое слово';
const MOVIE_TITLE = 'Фильм';

const SHORT_MOVIES_DURATION = 40;


const SCREEN_SIZE_DESKTOP = 1199;
const SCREEN_SIZE_MAX_TABLET = 1200;
const SCREEN_SIZE_MIN_TABLET = 767;
const SCREEN_SIZE_MOBILE = 768;
const SHOW_MOVIES_DESKTOP = 12;
const SHOW_MOVIES_TABLET = 8;
const SHOW_MOVIES_MOBILE = 5;
const MOVIES_ADD_DESKTOP = 3;
const MOVIES_ADD_MOBILE = 2;

export {
  FOOTER_LOCATION,
  HEADER_LOCATION,
  MAIN_API_URL,
  CARDS_IMAGE_API_URL,
  MOVIES_API_URL,
  NOTHING_FOUND,
  SERVER_ERROR,
  PROFILE_UPDATE_ERROR,
  PROFILE_UPDATE_COMPLETED,
  KEYWORD_REQUIRED,
  MOVIE_TITLE,
  SHORT_MOVIES_DURATION,
  SCREEN_SIZE_DESKTOP,
  SCREEN_SIZE_MAX_TABLET,
  SCREEN_SIZE_MIN_TABLET,
  SCREEN_SIZE_MOBILE,
  SHOW_MOVIES_DESKTOP,
  SHOW_MOVIES_TABLET,
  SHOW_MOVIES_MOBILE,
  MOVIES_ADD_DESKTOP,
  MOVIES_ADD_MOBILE,
};