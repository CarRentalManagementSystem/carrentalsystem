
//Only allow user to view notification
const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addNotification = async (req, res) => {
    const { receiverId, title , content} = req.body;
    console.log("notificationController Backend Received Issue:", req.body);

    try {
        const notification = await Notification.create({
            receiverId: new mongoose.Types.ObjectId(receiverId),
            title: title,
            content: content,
            createdDate: new Date()
        });
        console.log("Successfully stored rental data in DB:", notification);
        res.status(201).json(notification);
    } catch (error) {
        console.error("Error saving issue:", error.message);
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getNotifications , addNotification};


