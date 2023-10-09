import './PageNotFound.css';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {

  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__subtitle">Страница не найдена</p>
        <button className="not-found__button" onClick={() => navigate(-1)}>
          Назад
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;