import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const toggleLogoutPopup = () => setShowLogout(!showLogout);

  const handleLogout = async () => {
    try {
      await logout();
      setShowLogout(false);
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout Error:', err);
    }
  };

  return (
    <nav className="bg-white m-5 shadow-lg rounded-full flex justify-between items-center px-6 py-3 relative">
      <Link to="/vendors" className="flex items-center">
        <span className="text-2xl font-bold text-red-600 hover:text-blue-800 transition-colors">Vendors</span>
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/create-vendor" className="text-red-600 hover:text-blue-800 transition-colors">Create Vendor</Link>
        <Link to="/vendors" className="text-red-600 hover:text-blue-800 transition-colors">Vendors</Link>
        <div
          className="w-10 h-10 bg-red-500 text-white flex items-center justify-center rounded-full font-semibold hover:bg-indigo-600 transition-colors cursor-pointer"
          onClick={toggleLogoutPopup}
        >
          {user?.email?.slice(0, 2).toUpperCase()}
        </div>
        {showLogout && (
          <div className="absolute top-12 right-0 bg-gray-700 text-white my-2 mx-4 rounded-2xl shadow-lg p-2 transform transition-all duration-200 ease-in-out scale-95 hover:scale-100">
            <button
              onClick={handleLogout}
              className="px-3 py-1 m-1 bg-red-500 rounded-2xl hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;