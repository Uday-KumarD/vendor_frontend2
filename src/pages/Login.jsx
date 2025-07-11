import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState('');

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const errorParam = urlParams.get('error');
    if (token) {
      localStorage.setItem('token', token);
      setUser({}); // Minimal setUser call to mark authenticated
      navigate('/vendors', { replace: true });
    } else if (errorParam) {
      setError('Authentication failed');
    }
  }, [location, setUser, navigate]);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) throw new Error('No credential received from Google');
      const response = await axios.post('/api/auth/google', { token: credentialResponse.credential });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      navigate('/vendors', { replace: true });
    } catch (err) {
      setError('Google Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  if (!clientId) {
    return <div className="text-red-500 text-center mt-10">Google Client ID is missing</div>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
        <h1 className="text-5xl mt-20 font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text mb-10">
          Vendors App
        </h1>
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Login</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setError('Google Login failed')}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
