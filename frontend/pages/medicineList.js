import { useState, useEffect } from 'react';
import axios from 'axios';
import { filterMedicines, sortMedicines } from '../functions/filters';

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [medicinesPerPage] = useState(10);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchMedicines = async () => {
      const response = await axios.get('https://medicine-mauve.vercel.app/api/medicines/getList');
      setMedicines(response.data);
    };

    fetchMedicines();
  }, []);

  const filteredMedicines = filterMedicines(medicines, minPrice, maxPrice, manufacturer);
  const sortedMedicines = sortMedicines(filteredMedicines, sortBy);

  // Get current medicines
  const indexOfLastMedicine = currentPage * medicinesPerPage;
  const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
  const currentMedicines = sortedMedicines.slice(indexOfFirstMedicine, indexOfLastMedicine);

  // Change page
  const nextPage = () => {
    if (indexOfLastMedicine < sortedMedicines.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (indexOfFirstMedicine > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">All Medicines</h1>
      <div className="flex flex-col md:flex-row md:space-x-2 mb-4">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 rounded py-2 px-2 mb-2 md:mb-0 text-black"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 rounded py-2 px-2 mb-2 md:mb-0 text-black"
        />
        <input
          type="text"
          placeholder="Manufacturer"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          className="border border-gray-300 rounded py-2 px-4 mb-2 md:mb-0 text-black"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded py-2 px-4 mb-2 md:mb-0 text-black"
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
      </div>
      <ul className="divide-y divide-gray-300">
        {currentMedicines.map((medicine) => (
          <li key={medicine.Index} className="py-4">
            <h3 className="text-lg font-semibold">{medicine.Medicine_Name}</h3>
            <p><strong>Price:</strong> {medicine.Retail_Price}</p>
            <p><strong>Manufacturer:</strong> {medicine.Manufacturer}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={nextPage}
          disabled={indexOfLastMedicine >= sortedMedicines.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Medicines;
