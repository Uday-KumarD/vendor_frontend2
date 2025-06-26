import { useState, useEffect } from 'react';
import axios from 'axios';
import VendorList from '../components/VendorList';
import Pagination from '../components/Pagination';

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const vendorsPerPage = 7;

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/vendors?page=${currentPage}&limit=${vendorsPerPage}`, { withCredentials: true });
        setVendors(res.data.vendors);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVendors();
  }, [currentPage]);

  return (
    <div>
      <VendorList vendors={vendors} setVendors={setVendors} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

export default Vendors;