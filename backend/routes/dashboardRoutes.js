const express = require('express');
const router = express.Router();
const { getRentalStatistics } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

router.get('/statistics', protect, getRentalStatistics);

module.exports = router;
