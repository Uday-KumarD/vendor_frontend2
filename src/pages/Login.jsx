import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState('');

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  console.log('VITE_GOOGLE_CLIENT_ID:', clientId);
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/auth/user`, { withCredentials: true })
      .then(res => {
        if (res.data) {
          setUser(res.data);
          navigate('/vendors', { replace: true });
        }
      })
      .catch(err => {
        if (err.response?.status !== 401) {
          console.error('User Check Error:', err);
          setError('Failed to check authentication status');
        }
      });
  }, [navigate, setUser]);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      console.log('Google Credential:', credentialResponse.credential);
      if (!credentialResponse.credential) {
        throw new Error('No credential received from Google');
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/google`,
        { token: credentialResponse.credential },
        { withCredentials: true }
      );
      setUser(response.data.user);
      setError('');
      navigate('/vendors', { replace: true });
    } catch (err) {
      console.error('Google Login Error:', err.response?.data || err.message);
      setError('Google Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  if (!clientId) {
    setError('Google Client ID is missing. Please check environment variables.');
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <GoogleOAuthProvider
      clientId={clientId}
      onScriptLoadError={() => {
        console.error('Google OAuth script failed to load');
        setError('Failed to load Google OAuth script');
      }}
      onScriptLoadSuccess={() => console.log('Google OAuth script loaded successfully')}
    >
      <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.error('Google Login Failed');
            setError('Google Login failed');
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;