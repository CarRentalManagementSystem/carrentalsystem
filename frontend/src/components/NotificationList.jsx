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
              className="mb-4 p-6 bg-blue-50 border border-blue-200 rounded"
            >
              <h3 className="text-lg font-semibold">{notification.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                {formatDate(notification.createdAt)}
              </p>
              <p>{notification.content}</p>
            </div>
          ))}
          {recentRoleNotifications.map((notification) => (
            <div
              key={`role-${notification._id}`}
              className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded"
            >
              <h3 className="text-lg font-semibold">{notification.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                {formatDate(notification.createdAt)}
              </p>
              <p>{notification.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationList;
