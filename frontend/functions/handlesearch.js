import axios from 'axios';
import { useRouter } from 'next/router';

const handleSearch = async (query, setMedicines) => {
    const token = localStorage.getItem('token');
    console.log('Sending search request for:', query);
    try {
      const response = await axios.post(
        'https://medicine-mauve.vercel.app/api/medicines/search',
        { name: query }
      );
      console.log('Received response:', response.data);
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines', error);
    }
  };
  export default handleSearch;
