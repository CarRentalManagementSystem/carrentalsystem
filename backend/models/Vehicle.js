// car model
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    vehicleType: { type: String, required: true },
    features: { type: String, required: true },
    transmissionType: { type: String, required: true },
    rentalPricePerDay: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    vehicleStatus: { type: Boolean, default: true }
});


module.exports = mongoose.model('Vehicle', vehicleSchema);

