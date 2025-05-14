//Get Car Function:
//Only allow user to view cars

const Vehicle = require('../models/Vehicle');

const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getVehicles };


