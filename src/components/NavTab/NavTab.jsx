import './NavTab.css';
import { Link } from 'react-router-dom';
const NavTab = () => {
  return (
    <ul className="navtab">
      <li className="navtab__item">
        <Link smooth to="#about-project">
          О проекте
        </Link>
      </li>

      <li className="navtab__item">
        <Link smooth to="#techs">
          Технологии
        </Link>
      </li>

      <li className="navtab__item">
        <Link smooth to="#about-me">
          Студент
        </Link>
      </li>
    </ul>
  )
}

export default NavTab