import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const RentalList = ({ issues, setIssues, setEditingIssue }) => {
  const { user } = useAuth();
  const [names, setNames] = useState([]);
  const navigate = useNavigate();

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
      const response = await axiosInstance.put(
        `/api/issue/${issueId}`,
        { issueStatus: 'completed' },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      // Update local state
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === issueId ? { ...issue, issueStatus: 'completed' } : issue
        )
      );
    } catch (error) {
      console.error('Failed to update issue status:', error.message);
    }
  };





 return (
  <div>
    {issues
      .slice() // to avoid mutating original state
      .sort((a, b) => {
        // First sort by status
        if (a.issueStatus === 'incomplete' && b.issueStatus === 'completed') return -1;
        if (a.issueStatus === 'completed' && b.issueStatus === 'incomplete') return 1;

        // If same status, sort by date (latest first)
        return new Date(b.createdDate) - new Date(a.createdDate);
      })
      .map((issue) => {
        const sender = Array.isArray(names)
          ? names.find((u) => u._id === issue.senderId)
          : null;

        return (
          <div key={issue._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
            <p className="text-sm text-gray-500">
              Sender Name: {sender ? sender.name : 'Visitor'}
            </p>
            <p className="text-sm text-gray-500">Title: {issue.title ?? 'N/A'}</p>
            <p className="text-sm text-gray-500">Content: {issue.issueContent ?? 'N/A'}</p>
            <p className="text-sm text-gray-500">
              Date: {new Date(issue.createdDate).toLocaleString() ?? 'N/A'}
            </p>
            <p className="text-sm text-gray-500">Status: {issue.issueStatus ?? 'N/A'}</p>

            <div className="mt-2">
              <button
                onClick={() => handleMarkDone(issue._id)}
                className="mr-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Mark done
              </button>
            </div>
          </div>
        );
      })}
  </div>
);


};

export default RentalList;
