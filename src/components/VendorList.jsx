import { Link } from 'react-router-dom';
import axios from 'axios';

function VendorList({ vendors, setVendors }) {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/vendors/${id}`, { withCredentials: true });
        setVendors(vendors.filter(vendor => vendor._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Vendors List</h2>
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
                <Link to={`/edit-vendor/${vendor._id}`} className="text-blue-500 hover:text-blue-700 mr-2">Edit</Link>
                <button onClick={() => handleDelete(vendor._id)} className="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VendorList;