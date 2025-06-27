import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Vendors() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios.get(`/api/vendors?page=${page}&limit=10`)
      .then(res => {
        setVendors(res.data.vendors);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => setError('Failed to load vendors'));
  }, [page]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await axios.delete(`/api/vendors/${id}`);
        setVendors(prev => prev.filter(v => v._id !== id));
      } catch (err) {
        setError('Failed to delete vendor');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Vendors List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-100">
            <th className="p-2 border">Vendor Name</th>
            <th className="p-2 border">Bank Account No.</th>
            <th className="p-2 border">Bank Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map(vendor => (
            <tr key={vendor._id} className="hover:bg-blue-50 transition-colors">
              <td className="p-2 border">{vendor.name}</td>
              <td className="p-2 border">{vendor.bankAccountNo}</td>
              <td className="p-2 border">{vendor.bankName}</td>
              <td className="p-2 border">
                <button onClick={() => navigate(`/edit-vendor/${vendor._id}`)} className="text-blue-500 hover:underline mr-2">Edit</button>
                <button onClick={() => handleDelete(vendor._id)} className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          ← Previous
        </button>
        <span className="text-gray-700">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Vendors;
