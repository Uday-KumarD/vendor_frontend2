function Login() {
  const handleGoogleLogin = () => {
    window.location.href = 'https://vendor-backend3.onrender.com/api/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-all hover:scale-105">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Vendor Management</h2>
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;