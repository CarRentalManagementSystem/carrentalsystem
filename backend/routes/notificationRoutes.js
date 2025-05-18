
const express = require('express');
const { getNotifications, addNotification } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.use((req, res, next) => {
    console.log(`notificationRoutes.js received a ${req.method} request to ${req.originalUrl}`);
    next();
});

router.route('/').get(protect, getNotifications).post(addNotification);
// router.route('/:id').put(updateIssueStatus)


module.exports = router;