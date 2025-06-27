import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VendorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState({
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
      axios.get(`${import.meta.env.VITE_API_URL}/api/vendors/${id}`, { withCredentials: true })
        .then(res => setVendor(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor({ ...vendor, [name]: value });
    setError('');
  };

  const validateForm = () => {
    const requiredFields = ['name', 'bankAccountNo', 'bankName', 'address1'];
    const isValid = requiredFields.every(field => vendor[field].trim() !== '');
    if (!isValid) {
      setError('These fields are necessary');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      if (id) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/vendors/${id}`, vendor, { withCredentials: true });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/vendors`, vendor, { withCredentials: true });
      }
      navigate('/vendors');
    } catch (err) {
      console.error(err);
    }
  };

  const isFormValid = () => {
    const requiredFields = ['name', 'bankAccountNo', 'bankName', 'address1'];
    return requiredFields.every(field => vendor[field].trim() !== '');
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg mt-6 transform transition-all hover:scale-105">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">{id ? 'Edit Vendor' : 'Create Vendor'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={vendor.name}
          onChange={handleChange}
          placeholder="Vendor Name"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="bankAccountNo"
          value={vendor.bankAccountNo}
          onChange={handleChange}
          placeholder="Bank Account No."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="bankName"
          value={vendor.bankName}
          onChange={handleChange}
          placeholder="Bank Name"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="address1"
          value={vendor.address1}
          onChange={handleChange}
          placeholder="Address Line 1"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="address2"
          value={vendor.address2}
          onChange={handleChange}
          placeholder="Address Line 2"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="city"
          value={vendor.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="country"
          value={vendor.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="zipCode"
          value={vendor.zipCode}
          onChange={handleChange}
          placeholder="Zip Code"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!isFormValid()}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default VendorForm;