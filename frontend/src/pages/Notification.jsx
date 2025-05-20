import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import NotificationList from '../components/NotificationList';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

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

    if (user?.token) fetchNotifications();
  }, [user]);

  const isAdmin = user?.role === 'admin';

  const visibleNotifications = isAdmin
    ? notifications.filter(n => n.receiverRole === 'admin') //check role==admin, then display for all admin account
    : notifications.filter(n => String(n.receiverId) === String(user?.id)); // otherwise, check the userId for customer role

  return (
    <div className="max-w-xl p-8 mx-auto mt-16 bg-white shadow-lg rounded-xl">
      <h1 className="text-black text-4xl text-center font-semibold font-['Work_Sans'] mb-8">
        Notification
      </h1>
      <NotificationList notifications={visibleNotifications} />
    </div>
  );
};

export default Notifications;
