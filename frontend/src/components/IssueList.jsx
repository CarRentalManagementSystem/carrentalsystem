import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import IssueCard from './IssueCard';
import { filterByCategory, sortByStatusAndDate } from './issueFilter';

const IssueList = ({ issues, setIssues }) => {
  const { user } = useAuth();
  const [names, setNames] = useState([]);
  const [selectedCate, setSelectedCate] = useState('');
  const navigate = useNavigate();

  const cateList = [
    "Car Issue", "Lost Item", "Insurance", "Others", "option1", "option2", "option3"
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/api/auth/allName', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setNames(response.data);
      } catch (error) {
        navigate('/login');
      }
    };

    if (user.role === 'admin') {
      fetchUsers();
    }
  }, [user, navigate]);

  const handleMarkDone = async (issueId) => {
    try {
      await axiosInstance.put(
        `/api/issue/${issueId}`,
        { issueStatus: 'completed' },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === issueId ? { ...issue, issueStatus: 'completed' } : issue
        )
      );
    } catch (error) {
      console.error('Failed to update issue status:', error.message);
    }
  };

  const filteredSortedIssues = sortByStatusAndDate(
    filterByCategory(issues, selectedCate)
  );

  return (
    <div>
      {/* Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="category" className="block mb-2 font-bold text-lg">Filter:</label>
        <select
          id="category"
          value={selectedCate}
          onChange={(e) => setSelectedCate(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">All</option>
          {cateList.map((cate) => (
            <option key={cate} value={cate}>
              {cate}
            </option>
          ))}
        </select>
      </div>

      {/* Render Issues */}
      {filteredSortedIssues.map((issue) => {
        const sender = names.find((u) => u._id === issue.senderId);
        return (
          <IssueCard
            key={issue._id}
            issue={issue}
            sender={sender}
            onMarkDone={handleMarkDone}
          />
        );
      })}
    </div>
  );
};

export default IssueList;
