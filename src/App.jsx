import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Vendors from './pages/Vendors';
import CreateVendor from './pages/CreateVendor';
import Navbar from './components/Navbar';

function App() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div>
      {/* Show Navbar only if user is logged in */}
      {user && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/vendors"
          element={user ? <Vendors /> : <Login />}
        />
        <Route
          path="/create-vendor"
          element={user ? <CreateVendor /> : <Login />}
        />
        <Route
          path="/edit-vendor/:id"
          element={user ? <CreateVendor /> : <Login />}
        />
        <Route
          path="*"
          element={
            <div className="flex justify-center items-center h-screen">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">404 - Page Not Found</h2>
                <p className="text-gray-600">The page you're looking for doesn't exist.</p>
                <a href="/login" className="text-blue-600 hover:underline mt-4 inline-block">
                  Go to Login
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
