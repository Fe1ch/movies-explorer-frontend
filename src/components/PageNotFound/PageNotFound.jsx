import './PageNotFound.css';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-3, { replace: true });
  }

  return (
    <main className="content">
      <div className="not-found">
        <div className="not-found__container">
          <h1 className="not-found__title">404</h1>
          <p className="not-found__subtitle">Страница не найдена</p>
          <button className="not-found__button" onClick={handleBackClick}>
            Назад
          </button>
        </div>
      </div>
    </main>
  );
}

export default PageNotFound;