import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import IssueList from '../components/IssueList';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axiosInstance.get('/api/issue', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setIssues(response.data);
      } catch (error) {
        // navigate('/login');
      }
    };
    if(user){
      if (user.role !== 'admin'){
        alert('123');
      navigate('/');
    }}
    
    fetchIssues();
  }, [user, navigate]);



    return (
    <div className="max-w-xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-8">

      <h1 className="justify-start text-black text-4xl text-center font-semibold font-['Work_Sans'] mb-8">Customer Reported Issue</h1>
      <IssueList issues={issues} setIssues={setIssues} />
    </div>
  );
 
  


};

export default Reports;
