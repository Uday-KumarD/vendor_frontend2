import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function CreateVendor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vendorData, setVendorData] = useState({
    name: '',
    bankAccountNo: '',
    bankName: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    zipCode: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`${import.meta.env.VITE_API_URL}/api/vendors/${id}`)
        .then(res => setVendorData(res.data))
        .catch(err => setError('Failed to fetch vendor: ' + (err.response?.data?.message || err.message)));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting vendor:', vendorData);
      if (id) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/vendors/${id}`, vendorData);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/vendors`, vendorData);
      }
      navigate('/vendors');
    } catch (err) {
      console.error('Vendor Operation Error:', err);
      setError('Failed to save vendor: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleChange = (e) => {
    setVendorData({ ...vendorData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">{id ? 'Edit Vendor' : 'Create Vendor'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={vendorData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bank Account No</label>
          <input
            type="text"
            name="bankAccountNo"
            value={vendorData.bankAccountNo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bank Name</label>
          <input
            type="text"
            name="bankName"
            value={vendorData.bankName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address Line 1</label>
          <input
            type="text"
            name="address1"
            value={vendorData.address1}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address Line 2</label>
          <input
            type="text"
            name="address2"
            value={vendorData.address2}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={vendorData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={vendorData.country}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={vendorData.zipCode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {id ? 'Update Vendor' : 'Create Vendor'}
        </button>
      </form>
    </div>
  );
}

export default CreateVendor;