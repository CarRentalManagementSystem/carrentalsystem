
const express = require('express');
const { getAllVehicles, addVehicle, getOneVehicle, updateVehicle } = require('../controllers/vehicleController');
//Create a new router
const router = express.Router();
 
//when "/" receive GET request, run getCars
router.route('/').get(getAllVehicles);

/* POST new created vehicle */
router.route('/add').post(addVehicle);

router.route('/:id').get(getOneVehicle);

router.route('/update/:id').put(updateVehicle);

//allow other files to use this router
module.exports = router;

