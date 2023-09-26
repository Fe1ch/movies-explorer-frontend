import './Navigation.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className='nav'>
      <ul className='nav__list'>
        <li className='nav__item'>
          <Link to='/signup' className='nav__link'>Регистрация</Link>
        </li>
        <li className='nav__item'>
          <Link to='/signin' className='nav__link nav__link-signin'>Войти</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation