import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout Error:', err);
    }
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Vendor Management</h1>
        {user && (
          <div>
            <span className="mr-4">Welcome, {user.displayName}</span>
            <button onClick={handleLogout} className="text-white hover:underline">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;