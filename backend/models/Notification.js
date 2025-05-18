// issue model, for reporting
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    receiverRole: { type: String },
    title: { type: String, required: true },
    content: { type: String, required: true }
},
{ timestamps: true }
);


module.exports = mongoose.model('Notification', notificationSchema);


