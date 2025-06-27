import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Vendors from './pages/Vendors';
import CreateVendor from './pages/CreateVendor';
import Navbar from './components/Navbar';

function App() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
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