import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef();

  const toggleLogoutPopup = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowLogout(false);
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout Error:', err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-white m-5 shadow-xl rounded-full flex justify-between items-center px-8 py-4 relative">
      <Link to="/vendors" className="flex items-center">
        <span className="text-3xl font-extrabold tracking-tight hover:text-yellow-200 transition-colors">Vendors</span>
      </Link>
      <div className="flex items-center space-x-6">
        <Link to="/create-vendor" className="text-white font-medium ml-6 hover:text-yellow-200 transition-colors">Create Vendor</Link>
        <Link to="/vendors" className="text-white font-medium hover:text-yellow-200 transition-colors">Vendors</Link>
        {user && (
          <div ref={logoutRef} className="relative">
            <div
              className="w-10 h-10 bg-white text-red-600 flex items-center justify-center rounded-full font-bold hover:bg-yellow-200 transition-colors cursor-pointer"
              onClick={toggleLogoutPopup}
            >
              {user?.email?.slice(0, 2).toUpperCase()}
            </div>
            {showLogout && (
              <div className="absolute top-12 right-0 bg-white text-gray-900 my-2 mx-4 rounded-2xl shadow-lg p-3 transform transition-all duration-200 ease-in-out">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
