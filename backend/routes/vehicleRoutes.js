
const express = require('express');
const { getAllVehicles } = require('../controllers/vehicleController');
//Create a new router
const router = express.Router();

//when "/" receive GET request, run getCars
router.route('/').get(getAllVehicles)

//allow other files to use this router
module.exports = router;

