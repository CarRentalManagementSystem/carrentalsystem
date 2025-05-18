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

const getOneVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id)
        res.status(200).json(vehicle)
    } catch(error) {
        res.status(500).json({message: error.message});
    }
} 

const addVehicle = async (req, res) => {
  if (req.user.role === 'admin') {
    try {
      const vehicle = req.body;

      const newVehicle = Vehicle.create(vehicle);

      res.status(201).json(newVehicle);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized access' });
  }
};

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

