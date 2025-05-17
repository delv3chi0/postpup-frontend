import { createContext, useContext, useEffect, useState } from 'react';
import { default as jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const exp = decoded.exp * 1000;
      const timeLeft = exp - Date.now();

      if (timeLeft <= 0) {
        logout();
      } else {
        const timeout = setTimeout(logout, timeLeft);
        return () => clearTimeout(timeout);
      }
    } catch (err) {
      console.error('JWT decode failed:', err);
      logout();
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
