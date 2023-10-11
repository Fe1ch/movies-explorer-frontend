import './BurgerButton.css'

const BurgerButton = ({ setIsBurgerMenuOpen }) => {

  const handleClickBurger = () => {
    setIsBurgerMenuOpen(true);
  }

  return (
    <button className="burger-menu-button" onClick={handleClickBurger} type='button' />
  )
}

export default BurgerButton;