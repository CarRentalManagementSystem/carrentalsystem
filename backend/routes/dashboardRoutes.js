const express = require('express');
const router = express.Router();
const { getRentalStatistics } = require('../controllers/dashboardController');

router.get('/statistics', getRentalStatistics);

module.exports = router;
