import React, { createContext, useState, useEffect } from 'react';
import { signIn } from '../services/authService';

export const AuthContext = createContext({
  user: null,
  token: null,
  loading: false,
  loginUser: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // Exemple : restaurer token/user depuis localStorage au montage (optionnel)
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const loginUser = async (login, password) => {
    setLoading(true);
    try {
      const data = await signIn(login, password);
      // data attendu : { visiteur: {...}, access_token: '...' }
      setUser(data.visiteur ?? null);
      setToken(data.access_token ?? null);

      // optionnel : persister en localStorage
      if (data.access_token) localStorage.setItem('auth_token', data.access_token);
      if (data.visiteur) localStorage.setItem('auth_user', JSON.stringify(data.visiteur));

      return data;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    token,
    loading,
    loginUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
