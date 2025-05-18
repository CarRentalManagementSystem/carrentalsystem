import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { NotificationSender } from './NotificationSender';

const RentalForm = ({ rentals, setRentals}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ rentalId: '', senderId: '' , title: '' ,issueCategory: '' ,issueContent: '' ,createdDate: Date() ,issueStatus: 'incomplete'});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(user){
      formData.senderId = user.id;
    } 
    else {
      formData.rentalId = null;
    }

    if (  !formData.title || !formData.issueCategory || !formData.issueContent) {
      
      alert('Please fill out all fields.');
      return;
    }
    

    try {
      await axiosInstance.post('/api/issue',formData);
      await NotificationSender({
        targetRole: 'admin',
        title: 'New Report about:' + formData.title,
        content: 'Please contact related customer as soon as possible',
      });
      alert('Issue report successful! Our staff will contact you as soon as possible.');
      navigate('/');

    } catch (error) {
      console.error('Issue report failed:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      alert('Issue report failed... Please try again...');
    }
  };


  return (

      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="flex items-center gap-4 mb-4">
          <select
            value={formData.issueCategory}
            onChange={(e) => setFormData({ ...formData, issueCategory: e.target.value })}
            className="w-full px-5 py-2 border border-lg rounded-xl text-lg font-['Work_Sans']"
          >
            <option value="">Select a category</option>
            <option value="Car Issue">Car Issue</option>
            <option value="Lost Item">Lost Item</option>
            <option value="Insurance">Insurance</option>
            <option value="Others">Others</option>
            
          </select>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <input
            placeholder="Subject"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-5 py-2 border border-lg rounded-xl text-lg font-['Work_Sans']"
          />
        </div>
        <p>Max. 50 characters</p>

        <div className="flex items-center gap-4 mb-4">
          <select
            value={formData.rentalId}
            onChange={(e) => setFormData({ ...formData, rentalId: e.target.value })}
            className="w-full px-5 py-2 border border-lg rounded-xl text-lg font-['Work_Sans']"
          >
            <option value="">Select Rental Record(Optional)</option>
            {rentals
              .filter((rental) => rental.userId === user.id)
              .map((rental) => (
                <option key={rental._id} value={rental._id}>
                  {rental._id}
                </option>
              ))}
          </select>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <textarea
            placeholder="Issue Details"
            value={formData.issueContent}
            onChange={(e) => setFormData({ ...formData, issueContent: e.target.value })}
            className="w-full px-5 py-2 h-32 border border-lg rounded-xl text-lg font-['Work_Sans'] resize-none"
          />
        </div>
        <p>Max. 250 characters</p>

        <button type="submit" className="w-full bg-primary text-white text-lg font-['Work_Sans'] font-medium p-2 rounded hover:bg-primary-700 transition">
          Send
        </button>
      </form>

  );
};

export default RentalForm;