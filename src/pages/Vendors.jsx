import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Vendors() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login', { replace: true });
          return;
        }
        await axios.get('/api/auth/user');
      } catch (err) {
        console.error('Token Validation Error:', err);
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      }
    };
    validateToken();
  }, [navigate]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await axios.get(`/api/vendors?page=${page}`);
        setVendors(res.data.vendors);
        setTotalPages(res.data.totalPages);
        setError('');
      } catch (err) {
        setError('Failed to fetch vendors: ' + (err.response?.data?.message || err.message));
      }
    };
    if (user) {
      fetchVendors();
    }
  }, [page, user]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await axios.delete(`/api/vendors/${id}`);
        setVendors(vendors.filter(v => v._id !== id));
        setError('');
      } catch (err) {
        setError('Failed to delete vendor: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Vendors</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate('/create-vendor')}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Vendor
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-md text-left">
            <thead className="bg-blue-100 text-blue-700">
              <tr>
                <th className="px-4 py-2 border">Vendor Name</th>
                <th className="px-4 py-2 border">Bank Account No</th>
                <th className="px-4 py-2 border">Bank Name</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map(v => (
                <tr key={v._id} className="hover:bg-blue-50 transition">
                  <td className="px-4 py-2 border">{v.name}</td>
                  <td className="px-4 py-2 border">{v.bankAccountNo}</td>
                  <td className="px-4 py-2 border">{v.bankName}</td>
                  <td className="px-4 py-2 border">
                    {v.address1}{v.address2 && `, ${v.address2}`}, {v.city}, {v.country} - {v.zipCode}
                  </td>
                  <td className="px-4 py-2 border space-x-4">
                    <button
                      onClick={() => navigate(`/edit-vendor/${v._id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(v._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400 hover:bg-blue-700"
          >
            ← Previous
          </button>
          <span className="text-gray-700 font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(prev => prev + 1)}
            disabled={page === totalPages}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400 hover:bg-blue-700"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Vendors;
