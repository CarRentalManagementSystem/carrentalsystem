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
        console.error(error.message);
      }
    };
    
    fetchNotifications();

  }, [user, navigate]);
  const userNotifications = notifications.filter(
    (n) => String(n.receiverId) === String(user.id)
  );
  const roleNotifications = notifications.filter(
    (n) => String(n.receiverRole) === String(user.role)
  );

  return (
    <div className="max-w-xl p-8 mx-auto mt-16 bg-white shadow-lg rounded-xl">
      <h1 className="justify-start text-black text-4xl text-center font-semibold font-['Work_Sans'] mb-8">
        Notification
      </h1>
      <NotificationList userNotifications={userNotifications} roleNotifications={roleNotifications} />

    </div>
  );





};

export default Notifications;