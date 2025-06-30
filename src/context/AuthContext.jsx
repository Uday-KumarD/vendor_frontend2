import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return navigate('/login', { replace: true });
    }

    const checkAuth = async () => {
      try {
        const res = await axios.get('/api/auth/user');
        setUser(res.data);
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
