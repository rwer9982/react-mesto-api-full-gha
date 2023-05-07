import logo from '../images/logo.svg';
import { Link, Route, Routes } from 'react-router-dom';

function Header({ signOut, userMail }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип_заголовка" />
      <Routes>
        <Route path="/login" element={<Link to="/register" className="header__link">Зарегистрироваться</Link>} />
        <Route path="/register" element={<Link to="/login" className="header__link">Войти</Link>} />
        <Route path="/" element={
          <div className="header__link-container">
            <p className="header__user-mail">{userMail}</p>
          <Link to="/login" onClick={signOut} className="header__link">Выйти</Link>
          </div>
        } />
      </Routes>
    </header>
  );
}

export default Header;