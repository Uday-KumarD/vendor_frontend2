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
      axios.get(`/api/vendors/${id}`)
        .then(res => setVendorData(res.data))
        .catch(err => setError('Failed to fetch vendor: ' + (err.response?.data?.message || err.message)));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting vendor:', vendorData);
      if (!vendorData.name || !vendorData.bankAccountNo || !vendorData.bankName ||
          !vendorData.address1 || !vendorData.city || !vendorData.country || !vendorData.zipCode) {
        throw new Error('All required fields must be filled');
      }
      if (id) {
        await axios.put(`/api/vendors/${id}`, vendorData);
      } else {
        await axios.post(`/api/vendors`, vendorData);
      }
      setError('');
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">{id ? 'Edit Vendor' : 'Create Vendor'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={vendorData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Bank Account No</label>
          <input
            type="text"
            name="bankAccountNo"
            value={vendorData.bankAccountNo}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Bank Name</label>
          <input
            type="text"
            name="bankName"
            value={vendorData.bankName}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Address Line 1</label>
          <input
            type="text"
            name="address1"
            value={vendorData.address1}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Address Line 2</label>
          <input
            type="text"
            name="address2"
            value={vendorData.address2}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">City</label>
          <input
            type="text"
            name="city"
            value={vendorData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={vendorData.country}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={vendorData.zipCode}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {id ? 'Update Vendor' : 'Create Vendor'}
        </button>
      </form>
    </div>
  );
}

export default CreateVendor;