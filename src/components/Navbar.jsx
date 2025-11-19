import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
        <div className="navbar-links">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Link to="/" className="navbar-link">Accueil</Link>
          <Link to="/dashboard" className="navbar-link">Tableau de bord</Link>
        </div>
        <div>
          <Link to="/logout" className="navbar-link">Déconnexion</Link>
          <Link to="/login" className="navbar-link">Connexion</Link>
        </div>
      </div>
      </div>
      </nav>
    
  );
}

export default Navbar;
