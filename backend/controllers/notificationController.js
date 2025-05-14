
//Only allow user to view notification
const Notification = require('../models/Notification');
s
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotifications };


