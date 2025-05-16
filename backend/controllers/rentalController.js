// for user to do CRUD on their rental bookings
const mongoose = require('mongoose');


//Get Rental Function:
const Rental = require('../models/Rental');


const getRentals = async (req, res) => {
    try {

        const rentals = await Rental.find({ customerId: req.user._id }).populate("vehicleId"); //  Populate car details
        console.log("rentalController API returning Rentals:", JSON.stringify(rentals, null, 2)); //  check whether return rentals
        res.json(rentals);
    } catch (error) {
        console.error("rentalController Error fetching rentals:", error.message);
        res.status(500).json({ message: error.message });
    }
};


// Add Rental Function:
const addRental = async (req, res) => {
    const { customerId, vehicleId, rentedDate, returnedDate, totalRentalFee, rentalStatus, paymentStatus } = req.body;
    //const customerId = req.user.id;
    // Map the frontend field names to your backend names
    //const vehicleId = carId;
    //const rentedDate = pickupDate;
    //const returnedDate = returnDate;

    console.log("Backend Received Rental:", req.body);
    if (!customerId || !vehicleId || !rentedDate || !returnedDate || !totalRentalFee || !rentalStatus || !paymentStatus) {
        console.error("Missing required fields:", { customerId, vehicleId, rentedDate, returnedDate, totalRentalFee, rentalStatus, paymentStatus });
        return res.status(400).json({ message: 'There are missing required fields: customerId, vehicleId, rentedDate, returnedDate, totalRentalFee, rentalStatus, paymentStatus' });
    }
    try {
        const rental = await Rental.create({
            customerId: new mongoose.Types.ObjectId(customerId),
            vehicleId: new mongoose.Types.ObjectId(vehicleId),
            rentedDate: new Date(rentedDate),
            returnedDate: new Date(returnedDate),
            totalRentalFee: new Number(totalRentalFee),
            rentalStatus: 'booked', // set booked as default
            paymentStatus: new String(paymentStatus),
        });

        console.log("Successfully stored rental data in DB:", rental);
        res.status(201).json(rental);
    } catch (error) {
        console.error("Error saving rental:", error.message);
        res.status(500).json({ message: error.message });
    }
};


// Update Rental Booking:
/*const updateRental = async (req, res) => {
    const { vehicleId, rentedDate, returnedDate, totalRentalFee, paymentStatus } = req.body;
    const customerId = req.user.id;
    //const vehicleId = carId;
    //const rentedDate = pickupDate;
    //const returnedDate = returnDate;


    try {
        const rental = await Rental.findById(req.params.id);
        if (!rental) return res.status(404).json({ message: 'Rental not found' });

        rental.vehicleId = vehicleId ? new mongoose.Types.ObjectId(vehicleId) : rental.vehicleId;
        rental.rentedDate = rentedDate ? new Date(rentedDate) : rental.rentedDate;
        rental.returnedDate = returnedDate ? new Date(returnedDate) : rental.returnedDate;

        const updatedRental = await rental.save();
        res.json(updatedRental);
    } catch (error) {
        console.error("Error updating rental:", error.message);
        res.status(500).json({ message: error.message });
    }
};
*/

//cancel rental, keep it in db and change status to cancelled
const cancelRental = async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id);
        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }

        rental.rentalStatus = 'cancelled';
        const updatedRental = await rental.save();
        res.json(updatedRental);
    } catch (err) {
        res.status(500).json({ message: 'Failed to cancel rental' });
    }
};



// Delete Rental Booking:
const deleteRental = async (req, res) => {
    const { vehicleId, rentedDate, returnedDate, totalRentalFee, paymentStatus } = req.body;
    const customerId = req.user.id;
    const userRole = req.user.role;
    //const vehicleId = carId;
    //const rentedDate = pickupDate;
    //const returnedDate = returnDate;

    try {
        const rental = await Rental.findById(req.params.id);
        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        } else {
            if (userRole == "customer") {
                rental.rentalStatus = 'cancelled'
                const updatedRental = await rental.save();
                res.json(updatedRental);
            }
        }
    } catch (error) {
        console.error("Error updating rental:", error.message);
        res.status(500).json({ message: error.message });
    }



    // try {
    //     const rental = await Rental.findById(req.params.id);
    //     if (!rental) return res.status(404).json({ message: 'Rental not found' });
    //     await rental.remove();
    //     res.json({ message: 'Rental deleted' });
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
};
module.exports = { getRentals, addRental, updateRental, deleteRental, cancelRental };