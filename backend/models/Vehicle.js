// car model
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleId: { type: String, unique: true },
  manufacturer: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  rentalPricePerDay: { type: Number, required: true },
  vehicleStatus: { type: String, enum: ['available', 'rented', 'unavailable'], required: true },
  features: { type: [String] },
  techSpecs: {
    fuelType: { type: String, required: true },
    transmission: { type: String, required: true },
    type: { type: String, required: true },
    seats: { type: Number, required: true },
    doors: { type: Number, required: true },
  },
});


module.exports = mongoose.model('Vehicle', vehicleSchema);

