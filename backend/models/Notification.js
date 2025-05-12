// issue model, for reporting
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdDate: { type: Date, required: true },
});


module.exports = mongoose.model('Notification', notificationSchema);


