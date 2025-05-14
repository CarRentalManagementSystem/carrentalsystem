import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import IssueList from '../components/IssueList';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const { user } = useAuth();
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axiosInstance.get('/api/issue', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setRentals(response.data);
      } catch (error) {
        // navigate('/login');
      }
    };
    if (user?.role != 'agent'){
      navigate('/');
    }
    fetchIssues();
  }, [user, navigate]);



    return (
    <div className="max-w-xl p-8 mx-auto mt-16 bg-white shadow-lg rounded-xl">

      <h1 className="justify-start text-black text-4xl text-center font-semibold font-['Work_Sans'] mb-8">Customer Issue</h1>
      <IssueList/>
    </div>
  );
 
  


};

export default Reports;
