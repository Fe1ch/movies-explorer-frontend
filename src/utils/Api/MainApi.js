import { MAIN_API_URL, CARDS_IMAGE_API_URL } from '../config/config';

//Проверка ответа от сервера
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return (res.json())
      .then((err) => {
        const error = new Error(err.message);
        error.status = res.status;
        throw error;
      })
  }
};

// Регистрация пользователя
export const register = (name, email, password) => {
  return fetch(`${MAIN_API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password })
  })
    .then((res) => checkResponse(res));
}

// Авторизация пользователя
export const login = (email, password) => {
  return fetch(`${MAIN_API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => checkResponse(res))
};

// Проверка валидности токена пользователя
export const checkToken = (token) => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then((res) => checkResponse(res))
}

// Загрузка информации о пользователе
export const getUserInfo = () => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then((res) => checkResponse(res))
}

// Редактирование профиля
export const updateProfile = ({ name, email }) => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  }).then((res) => checkResponse(res))
}

// Получение сохраненных карточек
export const getSavedMovies = () => {
  return fetch(`${MAIN_API_URL}/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then((res) => checkResponse(res))
}

// Cохранение карточки на сервере
export const saveMoviesCard = (movie) => {
  return fetch(`${MAIN_API_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${CARDS_IMAGE_API_URL}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `${CARDS_IMAGE_API_URL}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }),
  }).then((res) => checkResponse(res))
}

// Удаление карточки с сервера 
export const deleteMoviesCard = (movieId) => {
  return fetch(`${MAIN_API_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then((res) => checkResponse(res))
}