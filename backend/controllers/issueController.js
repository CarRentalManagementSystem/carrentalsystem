

const Issue = require('../models/Issue');
const mongoose = require('mongoose');

const getIssues = async (req, res) => {
    try {
        const issues = await Issue.find();
        res.json(issues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Add Issue Function:
const addIssue = async (req, res) => {
    const { rentalId, senderId , title, issueCategory, issueContent } = req.body;


    console.log("issueController Backend Received 1231312:");
    console.log("issueController Backend Received Issue:", req.body);

    if (!rentalId || !senderId || !title|| !issueCategory|| !issueContent) {
        console.error("Missing required fields:", { rentalId, senderId, title, issueCategory, issueContent });
        return res.status(400).json({ message: 'There are missing required fields' });
    }
    try {

    // rentalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental' },
    // senderId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // title: { type: String, required: true },
    // issueCategory: { type: String, required: true },
    // issueContent: { type: String, required: true },
    // createdDate: { type: Date, required: true },
    // issueStatus: { type: String, enum: ['incompleted', 'completed'], default: 'incompleted' }


        const issue = await Issue.create({
            rentalId: new mongoose.Types.ObjectId(rentalId),
            senderId: req.user.id,
            title: title,
            issueCategory: issueCategory,
            issueContent: issueContent,
            createdDate: new Date(),
            issueStatus: 'incomplete' // set confirm as default
        });

        console.log("Successfully stored rental data in DB:", issue);
        res.status(201).json(issue);
    } catch (error) {
        console.error("Error saving issue:", error.message);
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getIssues, addIssue };


