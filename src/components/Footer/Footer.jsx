import './Footer.css';

// import { Route,/*  Link, */ Switch } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer-content">
        <p className="footer-content__date">&copy; {new Date().getFullYear()}</p>
        <nav className="footer-nav-links">
          <ul className="footer-nav-links__items">
            <li className="footer-nav-links__item">
              <a className="link"
                rel="noreferrer"
                href="https://praktikum.yandex.ru/"
                target="_blank">
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer-nav-links__item">
              <a className="link"
                rel="noreferrer"
                href="https://github.com/Fe1ch"
                target="_blank">
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;