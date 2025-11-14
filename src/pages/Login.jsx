import {useState}from 'react';
import {useAuth}from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import {loginUser} from '../context/AuthContext'
export default function Login() {
  // 1. États locaux pour les champs du formulaire
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');


const navigate = useNavigate();
const handleSubmit =(e)=>{
    e.preventDefault();
    if(loginUser(login,password)){
        navigate('/dashboard');
    }else{
        alert('Login ou mot de passe incorrect');
    }
};
  // 5. Rend le formulaire
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
        <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

