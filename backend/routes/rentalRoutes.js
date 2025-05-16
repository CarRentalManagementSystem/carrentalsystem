
const express = require('express');
const { getRentals, addRental, updateRental, deleteRental, cancelRental } = require('../controllers/rentalController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.use((req, res, next) => {
    console.log(`rentalRoutes.js received a ${req.method} request to ${req.originalUrl}`);
    next();
});

router.route('/').get(protect, getRentals).post(protect, addRental);
router.route('/cancel/:id').patch(protect, cancelRental);
router.route('/:id').put(protect, updateRental).delete(protect, deleteRental);




module.exports = router;