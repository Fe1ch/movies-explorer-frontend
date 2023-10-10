import './PageWithForm.css';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';

const PageWithForm = ({
  children,
  formName,
  title,
  underButtonText,
  onSubmit,
  link,
  linkName,
}) => {

  return (
    <section className="form-page">
      <div className="form-page__container">
        <Link to="/">
          <img className="form-page__logo" alt="Логотип" src={logo} />
        </Link>
        <h1 className="form-page__title">{title}</h1>
        <form
          className="form-page__form"
          name={formName}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
        </form>
        <div className="form-page__link-container">
          <p className="form-page__text">{underButtonText}</p>
          <Link className="form-page__link" to={link}>
            {linkName}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PageWithForm;