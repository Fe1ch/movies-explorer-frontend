import './Header.css';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';


const Header = () => {
  return (
    <header className='header'>
      <Link to='/'>
        <img className='header__logo' src={logo} alt="Логотип" />
      </Link>
      <Navigation />
    </header>
  )
}

export default Header