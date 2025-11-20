import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../styles/Navbar.css";

function Navbar() {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-links" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

        {/* Liens à gauche */}
        <div>
          <Link to="/" className="navbar-link">Accueil</Link>

          {/* Afficher Tableau de bord seulement si connecté */}
          {user && (
            <Link to="/dashboard" className="navbar-link">Tableau de bord</Link>
          )}
        </div>

        {/* Liens à droite */}
        <div>
          {/* Si user connecté → bouton Déconnexion */}
          {user ? (
            <button onClick={logoutUser} className="navbar-link logout-btn">
              Déconnexion
            </button>
          ) : (
            /* Sinon → lien Connexion */
            <Link to="/login" className="navbar-link">Connexion</Link>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
