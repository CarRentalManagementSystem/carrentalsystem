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



  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Report Issue</h1>
      <div className="max-w-xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-8">

        <h1 className="justify-start text-black text-4xl text-center font-semibold font-['Work_Sans'] mb-8">Tell us about your issue{rentals.id}</h1>
        <ReportForm rentals={rentals} setRentals={setRentals} />
      </div>
    </div>
  );




};

export default Reports;
