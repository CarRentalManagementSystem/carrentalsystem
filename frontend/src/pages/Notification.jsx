import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NotificationList from '../components/NotificationList';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/api/notification', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setNotifications(response.data);
      } catch (error) {
        // navigate('/login');
      }
    };
    fetchNotifications();




  //   const mockNotifications = [
  //   {
  //     _id: "6643a7f90f4d7b2c7e0a1234",
  //     receiverId: "663f3b2c9fa11a6a1d432aaa",
  //     title: "Rental Approved",
  //     content: "Your rental request for the Toyota Corolla has been approved.",
  //     createdDate: "2025-05-13T08:30:00.000Z"
  //   },
  //   {
  //     _id: "6643a8010f4d7b2c7e0a5678",
  //     receiverId: "67eb8e7107cea3130883c12f",
  //     title: "Admin message",
  //     content: "AdminAdminAdminAdminAdminAdmin",
  //     createdDate: "2025-05-12T12:00:00.000Z"
  //   },
  //   {
  //     _id: "6643a8090f4d7b2c7e0a9abc",
  //     receiverId: "6824220c09aba65a1652432a",
  //     title: "Customer message",
  //     content: "CustomerCustomerCustomerCustomerCustomer",
  //     createdDate: "2025-05-11T15:45:00.000Z"
  //   }
  // ];

  // setNotifications(mockNotifications);

  }, [user, navigate]);
const userNotifications = notifications.filter(
  (n) => String(n.receiverId) === String(user.id)
);
const roleNotifications = notifications.filter(
  (n) => String(n.receiverRole) === String(user.role)
);

return (
  <div className="max-w-xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-8">
    <h1 className="justify-start text-black text-4xl text-center font-semibold font-['Work_Sans'] mb-8">
      Notification
    </h1>
    <NotificationList userNotifications={userNotifications} roleNotifications={roleNotifications}/>
    
  </div>
);

 
  


};

export default Notifications;