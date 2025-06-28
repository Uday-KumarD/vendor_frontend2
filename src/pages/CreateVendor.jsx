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
    const validateToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login', { replace: true });
          return;
        }
        await axios.get('/api/auth/user');
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      }
    };
    validateToken();
  }, [navigate]);

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
      if (!vendorData.name || !vendorData.bankAccountNo || !vendorData.bankName || !vendorData.address1 || !vendorData.city || !vendorData.country || !vendorData.zipCode) {
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
      setError('Failed to save vendor: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleChange = (e) => {
    setVendorData({ ...vendorData, [e.target.name]: e.target.value });
  };

  const requiredFields = ['name', 'bankAccountNo', 'bankName', 'address1'];
  const isFormValid = requiredFields.every(field => vendorData[field].trim() !== '');

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg m-6 hover:scale-105 duration-300 ease-in-out">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">{id ? 'Edit Vendor' : 'Create Vendor'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={vendorData.name}
          onChange={handleChange}
          placeholder="Vendor Name"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="bankAccountNo"
          value={vendorData.bankAccountNo}
          onChange={handleChange}
          placeholder="Bank Account No."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="bankName"
          value={vendorData.bankName}
          onChange={handleChange}
          placeholder="Bank Name"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="address1"
          value={vendorData.address1}
          onChange={handleChange}
          placeholder="Address Line 1"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="address2"
          value={vendorData.address2}
          onChange={handleChange}
          placeholder="Address Line 2"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="city"
          value={vendorData.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="country"
          value={vendorData.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="zipCode"
          value={vendorData.zipCode}
          onChange={handleChange}
          placeholder="Zip Code"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!isFormValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateVendor;
