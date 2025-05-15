
const NotificationList = ({ userNotifications, roleNotifications }) => {


  return (
    <div>
      
      {userNotifications.length === 0 && roleNotifications.length === 0 ? (
      <p className="text-center text-gray-500">No notifications.</p>
    ) : (
      <div>
        {userNotifications.map((notification) => (
          <div
            key={`user-${notification._id}`}
            className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded"
          >
            <h3 className="text-lg font-semibold">{notification.title}</h3>
            <p>{notification.content}</p>
          </div>
        ))}
        {roleNotifications.map((notification) => (
          <div
            key={`role-${notification._id}`}
            className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded"
          >
            <h3 className="text-lg font-semibold">{notification.title}</h3>
            <p>{notification.content}</p>
          </div>
        ))}
      </div>
    )}

    </div>
  );
};

export default NotificationList;
