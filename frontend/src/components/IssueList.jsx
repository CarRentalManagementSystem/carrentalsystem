import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const RentalList = ({ issues, setIssues, setEditingIssue }) => {
  const { user } = useAuth();
  const [names, setNames] = useState([]);
  const navigate = useNavigate();
  const [selectedCate, setSelectedCate] = useState('');
  const cateList = ["Car Issue", "Lost Item", "Insurance", "Others", "option1", "option2","option3"];


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

    if (user?.role === 'admin') {
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
    {/* Category Filter */}
    <div className="mb-4">
  <label htmlFor="category" className="block mb-2 text-lg font-bold">Filter:</label>
  <select
    id="category"
    value={selectedCate}
    onChange={(e) => setSelectedCate(e.target.value)}
    className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
  >
    <option value="">All</option>
    {cateList.map((cate) => (
      <option key={cate} value={cate}>
        {cate}
      </option>
    ))}
  </select>
</div>

    {issues
      .filter((issue) => selectedCate === '' || issue.issueCategory === selectedCate)
      .slice()
      .sort((a, b) => {
        if (a.issueStatus === 'incomplete' && b.issueStatus === 'completed') return -1;
        if (a.issueStatus === 'completed' && b.issueStatus === 'incomplete') return 1;
        return new Date(b.createdDate) - new Date(a.createdDate);
      })
      .map((issue) => {
        const sender = Array.isArray(names)
          ? names.find((u) => u._id === issue.senderId)
          : null;

return (
  <div
    key={issue._id}
    className="p-6 mb-4 bg-white border border-gray-200 shadow rounded-xl"
  >
    <div className="flex items-start justify-between">
      <div className="w-full">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">{issue.title ?? 'No Title'}</h2>
        </div>
        
 
        <div className="flex justify-end gap-2"> 
          <span className="px-3 py-1 text-sm text-black bg-blue-100 border border-blue-300 rounded-full">
            {issue.issueCategory ?? 'N/A'}
          </span>
          <span className="px-3 py-1 text-sm text-black bg-blue-100 border border-blue-300 rounded-full">
            {issue?.rentalId ?? 'N.A'}
          </span>
        </div>
               <div className="flex justify-end gap-2"><span className="text-sm text-gray-500">{new Date(issue.createdDate).toISOString().split('T')[0]}</span></div>
        
        <p className="mb-2 text-gray-500">{issue.issueContent ?? 'No content'}</p>

        <div className="text-sm text-gray-700">
          <p>Sender: {sender ? sender.name : 'Visitor'}</p>
          <p>email:  {sender?.email ?? 'N/A'}</p>
          <p>Tel: {sender?.phoneNumber ?? 'N/A'}</p>
        </div>
      </div>
      
    </div>
    <div className="mt-4 text-right">
      <button
          onClick={() => handleMarkDone(issue._id)}
          disabled={issue.issueStatus === 'completed'}
          className={`px-6 py-2 rounded ${
            issue.issueStatus === 'completed'
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {issue.issueStatus === 'completed' ? 'Done' : 'Mark Done'}
        </button>
    </div>
  </div>
);


      })}
  </div>
);




};

export default RentalList;