import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  console.log('🧠 AuthProvider rendering');

  useEffect(() => {
    console.log('📍 AuthProvider useEffect triggered');
    const token = localStorage.getItem('token');
    console.log('🔑 Token from localStorage:', token);

    if (token) {
      try {
        console.log('🔍 Attempting to decode token...');
        const decoded = jwtDecode(token);
        console.log('✅ Decoded token:', decoded);
        if (decoded.exp * 1000 < Date.now()) {
          console.log('⏰ Token expired');
          localStorage.removeItem('token');
          setUser(null);
          navigate('/login');
        } else {
          console.log('👤 Valid token, setting user');
          setUser(decoded);
        }
      } catch (err) {
        console.error('🚨 JWT Decode Error:', err);
        localStorage.removeItem('token');
        setUser(null);
      }
    } else {
      console.log('📭 No token found');
    }
  }, [navigate]);

  console.log('📦 AuthProvider - User state:', user);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
