import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import CreateVendor from './pages/CreateVendor';
import Vendors from './pages/Vendors';
import Navbar from './components/Navbar';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 animate-gradient">
      {user && <Navbar/>}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/vendors" /> : <Login />} />
        <Route path="/create-vendor" element={user ? <CreateVendor /> : <Navigate to="/login" />} />
        <Route path="/vendors" element={user ? <Vendors /> : <Navigate to="/login" />} />
        <Route path="/edit-vendor/:id" element={user ? <CreateVendor /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/vendors" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default App;