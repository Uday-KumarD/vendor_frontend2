import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function CreateVendor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vendor, setVendor] = useState({
    name: '', bankAccountNo: '', bankName: '', address1: '', address2: '', city: '', country: '', zipCode: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`/api/vendors/${id}`)
        .then(res => setVendor(res.data))
        .catch(err => setError('Failed to fetch vendor'));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor({ ...vendor, [name]: value });
    setError('');
  };

  const validateForm = () => {
    const required = ['name', 'bankAccountNo', 'bankName', 'address1'];
    return required.every(field => vendor[field].trim() !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError('Please fill all required fields');
      return;
    }
    try {
      if (id) await axios.put(`/api/vendors/${id}`, vendor);
      else await axios.post('/api/vendors', vendor);
      navigate('/vendors');
    } catch (err) {
      setError('Error saving vendor');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg mt-6 transform transition-all hover:scale-105">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">{id ? 'Edit Vendor' : 'Create Vendor'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'bankAccountNo', 'bankName', 'address1', 'address2', 'city', 'country', 'zipCode'].map(field => (
          <input
            key={field}
            type="text"
            name={field}
            value={vendor[field]}
            onChange={handleChange}
            placeholder={field.replace(/([A-Z])/g, ' $1')}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={['name', 'bankAccountNo', 'bankName', 'address1'].includes(field)}
          />
        ))}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
          disabled={!validateForm()}
        >
          {id ? 'Update Vendor' : 'Create Vendor'}
        </button>
      </form>
    </div>
  );
}

export default CreateVendor;
