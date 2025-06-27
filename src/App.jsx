import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import CreateVendor from './pages/CreateVendor';
import Vendors from './pages/Vendors';
import Navbar from './components/Navbar';

function App() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 animate-gradient">
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/vendors" replace /> : <Login />} />
        <Route path="/create-vendor" element={user ? <CreateVendor /> : <Navigate to="/login" replace />} />
        <Route path="/vendors" element={user ? <Vendors /> : <Navigate to="/login" replace />} />
        <Route path="/edit-vendor/:id" element={user ? <CreateVendor /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to={user ? "/vendors" : "/login"} replace />} />
      </Routes>
    </div>
  );
}

export default App;