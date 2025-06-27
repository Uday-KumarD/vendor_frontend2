import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          console.log('Checking auth with token:', token.substring(0, 20) + '...');
          const res = await axios.get('/api/auth/user');
          console.log('Auth Check Response:', res.data);
          setUser(res.data);
        } else {
          console.log('No token found in localStorage');
          navigate('/login', { replace: true });
        }
      } catch (err) {
        console.error('Auth Check Error:', err.response?.data || err.message);
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const logout = async () => {
    try {
      console.log('Logging out, clearing token');
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout Error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};