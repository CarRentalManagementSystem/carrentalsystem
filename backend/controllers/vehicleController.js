//Get Car Function:
//Only allow user to view cars

const Vehicle = require('../models/Vehicle');

const getAllVehicles= async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addVehicle = async (req , res) => {
    try {
        const vehicle = req.body;

        const newVehicle = Vehicle.create(vehicle);
        
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getOneVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id)
        res.status(200).json(vehicle)
    } catch(error) {
        res.status(500).json({message: error.message});
    }
} 

const updateVehicle = async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const updatedInfo = req.body;

        const updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId, updatedInfo);

        res.status(201).json(updatedVehicle);
    } catch(error) {
        res.status(500).json({message:error.message});
    }
}

const deleteVehicle = async (req,res) => {
    try {
        const vehicleId = req.params.id;
        await Vehicle.findByIdAndDelete(vehicleId);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { getAllVehicles, addVehicle, getOneVehicle, updateVehicle, deleteVehicle };

