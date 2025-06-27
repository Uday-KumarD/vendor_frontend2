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
    const fetchVendors = async () => {
      try {
        const res = await axios.get(`/api/vendors?page=${page}`);
        setVendors(res.data.vendors);
        setTotalPages(res.data.totalPages);
        setError('');
      } catch (err) {
        console.error('Fetch Vendors Error:', err);
        setError('Failed to fetch vendors: ' + (err.response?.data?.message || err.message));
      }
    };
    fetchVendors();
  }, [page]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await axios.delete(`/api/vendors/${id}`);
        setVendors(vendors.filter(vendor => vendor._id !== id));
        setError('');
      } catch (err) {
        console.error('Delete Vendor Error:', err);
        setError('Failed to delete vendor: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Vendors</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={() => navigate('/create-vendor')}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700"
      >
        Add Vendor
      </button>
      <div className="grid grid-cols-1 gap-4">
        {vendors.map(vendor => (
          <div key={vendor._id} className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">{vendor.name}</h3>
            <p className="text-gray-600">Bank: {vendor.bankName} - {vendor.bankAccountNo}</p>
            <p className="text-gray-600">Address: {vendor.address1}{vendor.address2 ? `, ${vendor.address2}` : ''}, {vendor.city}, {vendor.country}, {vendor.zipCode}</p>
            <div className="mt-2 flex space-x-4">
              <button
                onClick={() => navigate(`/edit-vendor/${vendor._id}`)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(vendor._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400 hover:bg-blue-700"
        >
          ← Previous
        </button>
        <span className="text-gray-700">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(prev => prev + 1)}
          disabled={page === totalPages}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400 hover:bg-blue-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Vendors;