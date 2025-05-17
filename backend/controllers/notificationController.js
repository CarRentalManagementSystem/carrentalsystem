
//Only allow user to view notification

const mongoose = require('mongoose');
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
  const { receiverId, receiverRole, title, content } = req.body;
  console.log("notificationController Backend Received Issue:", req.body);

  let receiverIdObj = null;
  if (receiverId && receiverId.trim() !== '') {
    receiverIdObj = new mongoose.Types.ObjectId(receiverId);
  }



  try {
    const notification = await Notification.create({
      receiverRole: receiverRole,
      receiverId: receiverIdObj,
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


module.exports = { getNotifications, addNotification };


