
const express = require('express');
const { getIssues, addIssue } = require('../controllers/issueController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.use((req, res, next) => {
    console.log(`issueRoutes.js received a ${req.method} request to ${req.originalUrl}`);
    next();
});

router.route('/').get(protect, getIssues).post(protect, addIssue);
//router.route('/:id').put(protect, updateIssue).delete(protect, deleteIssue);


module.exports = router;