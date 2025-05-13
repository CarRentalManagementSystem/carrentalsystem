// issue model, for reporting
const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    rentalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental' },
    senderId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    issueCategory: { type: String, required: true },
    issueContent: { type: String, required: true },
    createdDate: { type: Date, required: true },
    issueStatus: { type: String, enum: ['incomplete', 'completed'], default: 'incomplete' }
});


module.exports = mongoose.model('Issue', issueSchema);


