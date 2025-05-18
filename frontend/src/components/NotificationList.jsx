const NotificationList = ({ userNotifications, roleNotifications }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Calculate the date 7 days ago from now
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Filter and sort user notifications
  const recentUserNotifications = [...userNotifications]
    .filter((n) => new Date(n.createdAt) >= sevenDaysAgo)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Filter and sort role notifications
  const recentRoleNotifications = [...roleNotifications]
    .filter((n) => new Date(n.createdAt) >= sevenDaysAgo)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      {recentUserNotifications.length === 0 && recentRoleNotifications.length === 0 ? (
        <p className="text-center text-gray-500">No notifications in the last 7 days.</p>
      ) : (
        <div>
          {recentUserNotifications.map((notification) => (
            <div
              key={`user-${notification._id}`}
              className="max-w-xl mx-auto mt-4 bg-white border border-gray-100 rounded-xl shadow-lg p-8"
            >
              <h3 className="text-lg font-semibold">{notification.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                {formatDate(notification.createdAt)}
              </p>
              <p className="text-gray-800 mb-1">{notification.content}</p>
            </div>
          ))}
          {recentRoleNotifications.map((notification) => (
            <div
              key={`role-${notification._id}`}
              className="max-w-xl mx-auto mt-4 bg-white border border-gray-100 rounded-xl shadow-lg p-8"
            >
              <h3 className="text-lg font-semibold">{notification.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                {formatDate(notification.createdAt)}
              </p>
              <p className="text-gray-800 mb-1">{notification.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationList;
