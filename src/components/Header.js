//import images 
import logoImg from '../images/logo.svg'

function Header() {
  return (
    <header className="header root__header">
      <img src={logoImg} alt="Логотип" className="logo root__logo" />
    </header>
  );
}

export default Header