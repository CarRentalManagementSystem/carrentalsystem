import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import ReportForm from '../components/ReportForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const { user } = useAuth();
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await axiosInstance.get('/api/rentals', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setRentals(response.data);
      } catch (error) {
        // navigate('/login');
      }
    };
    fetchRentals();
  }, [user, navigate]);


  if (user){
    return (
    <div className="max-w-xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-8">
      <button type="submit" className="w-full bg-primary text-white text-lg font-['Work_Sans'] font-medium p-2 rounded hover:bg-primary-700 transition">
          Live Chat
        </button>
      <h1 className="justify-start text-black text-4xl text-center font-semibold font-['Work_Sans'] mb-8">Report Issue</h1>
      <ReportForm rentals={rentals} setRentals={setRentals} />
    </div>
  );
  }else{
    return (
    <div className="max-w-xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-8">
      
      <button type="submit" className="w-full bg-primary text-white text-lg font-['Work_Sans'] font-medium p-2 rounded hover:bg-primary-700 transition">
          Live Chat
        </button>
    </div>
  );
  }
  


};

export default Reports;
