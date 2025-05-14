

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


    console.log("issueController Backend Received Issue:", req.body);

    if ( !title|| !issueCategory|| !issueContent) {
        console.error("Missing required fields:", { rentalId, title, issueCategory, issueContent });
        return res.status(400).json({ message: 'There are missing required fields' });
    }
    
    let rentalIdObj = null;
    if (rentalId && rentalId.trim() !== '') {
        rentalIdObj = new mongoose.Types.ObjectId(rentalId); // Only convert if it's a valid string
    }
    let senderIdObj = null;
    if (senderId && senderId.trim() !== '') {
        senderIdObj = new mongoose.Types.ObjectId(senderId); // Only convert if it's a valid string
    }

    try {
        const issue = await Issue.create({
            rentalId: rentalIdObj,
            senderId: senderIdObj,
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



const updateIssueStatus = async (req, res) => {
  try {
    const { issueStatus } = req.body;

    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { issueStatus },
      { new: true } // return the updated document
    );

    if (!updatedIssue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.json(updatedIssue);
  } catch (error) {
    console.error("Error updating issue status:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = { getIssues, addIssue,  updateIssueStatus};


