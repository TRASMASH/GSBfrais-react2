import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  // Si l'utilisateur n'est PAS connecté → redirection automatique
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Sinon → afficher la page demandée (Dashboard)
  return children;
}
