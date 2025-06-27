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
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/vendors?page=${page}&limit=10`);
        setVendors(res.data.vendors);
        setTotalPages(res.data.totalPages);
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
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/vendors/${id}`);
        setVendors(vendors.filter(vendor => vendor._id !== id));
      } catch (err) {
        console.error('Delete Vendor Error:', err);
        setError('Failed to delete vendor: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Vendors</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={() => navigate('/create-vendor')}
        className="bg-blue-600 text-white p-2 rounded mb-4 hover:bg-blue-700"
      >
        Add Vendor
      </button>
      <div className="grid grid-cols-1 gap-4">
        {vendors.map(vendor => (
          <div key={vendor._id} className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold">{vendor.name}</h3>
            <p>Bank: {vendor.bankName} - {vendor.bankAccountNo}</p>
            <p>Address: {vendor.address1}{vendor.address2 ? `, ${vendor.address2}` : ''}, {vendor.city}, {vendor.country}, {vendor.zipCode}</p>
            <div className="mt-2">
              <button
                onClick={() => navigate(`/edit-vendor/${vendor._id}`)}
                className="text-blue-500 mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(vendor._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(prev => prev + 1)}
          disabled={page === totalPages}
          className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Vendors;