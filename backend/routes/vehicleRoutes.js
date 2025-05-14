
const express = require('express');
const { getVehicles } = require('../controllers/vehicleController');
//Create a new router
const router = express.Router();

//when "/" receive GET request, run getCars
router.route('/').get(getVehicles)

//allow other files to use this router
module.exports = router;

