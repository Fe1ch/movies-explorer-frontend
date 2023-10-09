import './Header.css';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import UserNavigation from '../UserNavigation/UserNavigation';

const Header = ({ isLoggedIn }) => {

  return (
    <header className='header'>
      <Link to='/'>
        <img className='header__logo' src={logo} alt="Логотип" />
      </Link>
      {!isLoggedIn && <Navigation />}
      {isLoggedIn && <UserNavigation />}
    </header>
  )
}

export default Header;