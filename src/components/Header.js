import { Switch, Route, Link } from 'react-router-dom'

//import images 
import logoImg from '../images/logo.svg'

function Header({ onSingOut, userEmail }) {
  return (
    <header className="header root__header">
      <img src={logoImg} alt="Логотип" className="logo root__logo" />
      <Switch>
        <Route path="/sign-in">
          <Link className="auth__link" to="/sign-up">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link className="auth__link" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route path="/">
          <div>
            <span className='auth__email'>{userEmail || ''}</span>
            <Link onClick={onSingOut} className="auth__link auth__link_singout" to="/sign-in">
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header