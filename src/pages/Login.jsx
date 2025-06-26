import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/auth/user`, { withCredentials: true })
      .then(res => {
        if (res.data) {
          setUser(res.data);
          navigate('/vendors');
        }
      })
      .catch(err => console.error('User Check Error:', err));
  }, [navigate]);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      console.log('Google Credential:', credentialResponse.credential);
      if (!credentialResponse.credential) {
        throw new Error('No credential received from Google');
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/google`,
        { token: credentialResponse.credential },
        { withCredentials: true }
      );
      setUser(response.data.user);
      navigate('/vendors');
    } catch (err) {
      console.error('Google Login Error:', err.response?.data || err.message);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Login</h2>
        {user ? (
          <div>
            <p>Welcome, {user.displayName}</p>
            <button
              onClick={() => {
                axios.post(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {}, { withCredentials: true })
                  .then(() => {
                    setUser(null);
                    navigate('/login');
                  });
              }}
              className="text-blue-500"
            >
              Logout
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.error('Login Failed')}
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;