import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import ReportForm from '../components/ReportForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const { user } = useAuth();
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    navigate('/report');

  }



  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="max-w-xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-8">
        <h1 className="justify-start text-black text-4xl text-center font-regular font-['Work_Sans'] mb-8">Report Issue</h1>
        <h1 className="justify-start text-black text-xl font-light font-['Work_Sans'] mb-2">Leave us a message! (Message log)</h1>
        <h1 className="justify-start text-black text-xl font-light font-['Work_Sans'] mb-6">We will check back at your inquiry!</h1>
        <form onSubmit={handleSubmit} className="space-y-5"><button type="submit" className="w-full bg-primary text-white text-lg font-['Work_Sans'] font-medium p-2 rounded hover:bg-primary-700 transition">
          Click to leave message
        </button>
        </form>
      </div>
    </div >
  );


};

export default Contact;
