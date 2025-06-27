import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Vendors from './pages/Vendors';
import CreateVendor from './pages/CreateVendor';
import Navbar from './components/Navbar';

function App() {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-2xl font-bold">Loading...</div>;
  }

  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/vendors" replace /> : <Login />}
        />
        <Route
          path="/vendors"
          element={user ? <Vendors /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/create-vendor"
          element={user ? <CreateVendor /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/edit-vendor/:id"
          element={user ? <CreateVendor /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;