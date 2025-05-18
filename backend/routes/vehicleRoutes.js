
const express = require('express');
const { getAllVehicles, addVehicle, getOneVehicle, updateVehicle, deleteVehicle } = require('../controllers/vehicleController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
 
//when "/" receive GET request, run getCars
router.route('/').get(getAllVehicles);

router.route('/:id').get(getOneVehicle);

/* Admin specific requests */
router.route('/add').post(protect, addVehicle);

router.route('/update/:id').put(protect, updateVehicle);

router.route('/delete/:id').delete(protect, deleteVehicle);



//allow other files to use this router
module.exports = router;

