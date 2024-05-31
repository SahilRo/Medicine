import axios from 'axios';
import { useRouter } from 'next/router';

const handlefeedback = async (e,name,setName,feedback,setFeedback) => {
    e.preventDefault();

    try {
        await axios.post('https://medicine-mauve.vercel.app/api/feedback', { name, feedback });
        alert('Feedback submitted successfully!');
        setName('');
        setFeedback('');
    } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback. Please try again.');
    }
};
export default handlefeedback;
