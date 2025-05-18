const { v4: uuidv4 } = require('uuid');

// get all vehicles
const Vehicle = require('../models/Vehicle');

const getAllVehicles= async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get only one vehicle
const getOneVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id)
        res.status(200).json(vehicle)
    } catch(error) {
        res.status(500).json({message: error.message});
    }
} 

// add one vehicle (agent only)
const addVehicle = async (req, res) => {

  if (req.user.role === 'admin') {
    try {
      const vehicle = req.body;
      vehicle.vehicleId = uuidv4();

      const newVehicle = Vehicle.create(vehicle);

      res.status(201).json(newVehicle);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized access' });
  }
};

// update one vehicle (agent only)
const updateVehicle = async (req, res) => {
    if (req.user.role === 'admin') {
        try {
            const vehicleId = req.params.id;
            const updatedInfo = req.body;
    
            const updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId, updatedInfo);
    
            res.status(201).json(updatedVehicle);
        } catch(error) {
            res.status(500).json({message:error.message});
        }
    } else {
        res.status(401).json({ message: 'Unauthorized access' });
    }
}

// delete one vehicle (agent only)
const deleteVehicle = async (req,res) => {
    if (req.user.role === 'admin') {
      try {
        const vehicleId = req.params.id;
        await Vehicle.findByIdAndDelete(vehicleId);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized access' });
    }
}

module.exports = { getAllVehicles, addVehicle, getOneVehicle, updateVehicle, deleteVehicle };

