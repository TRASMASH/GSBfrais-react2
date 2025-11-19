import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // Hooks / contexte
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  // états du formulaire
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // optionnel mais recommandé

  // Remplace ta fonction handleSubmit par celle-ci (ASYNCHRONE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(login, password);

      // vérification basique de la réponse
      if (!data || !data.access_token) {
        throw new Error('Token non reçu');
      }

      // redirection si tout va bien
      navigate('/dashboard');
    } catch (err) {
      // message d'erreur pour l'utilisateur
      alert(err?.response?.data?.message || 'Echec de la connexion');
      console.error('Erreur login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Connexion</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label>Login :</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
