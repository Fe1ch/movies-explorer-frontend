import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({ link, alt, title, duration }) => {

  const location = useLocation().pathname;
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleDeleteCard = (evt) => {
    evt.target.closest('.card').remove();
  };

  return (
    <li className="card">
      <div className="card__container">
        {location === '/movies' ? (
          <button
            className={`card__button-save ${!isSaved && `card__button-save_active`
              }`}
            onClick={handleSave}
          >
            Сохранить
          </button>
        ) : (
          ''
        )}
        {location === '/saved-movies' ? (
          <button onClick={handleDeleteCard} className="card__button-remove" />
        ) : (
          ''
        )}
        <div
          className={`card__label-tip ${isSaved && `card__label-tip_active`}`}
        />
        <a
          className="card__link"
          href={"1"}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="card__image"
            src={link}
            alt={alt} />
        </a>
      </div>
      <div className="card__data-container">
        <p className="card__title">{title}</p>
        <div className="card__duration-container">
          <p className="card__duration-value">{duration}</p>
        </div>
      </div>
    </li>
  );
}

export default MoviesCard;