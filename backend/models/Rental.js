// rental model, for renting
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    rentedDate: { type: Date, required: true },
    returnedDate: { type: Date, required: true },
    rentalStatus: { type: String, enum: ['available', 'booked', 'inuse'], default: 'available' }
});
/*
//fix issue, to avoid conflict
delete mongoose.models['Rental'];
// creat a model (new collection)
const Rental = mongoose.model('Rental', rentalSchema);
// log the schema to confirm
console.log("Rental Schema Paths (models/Rental.js):", Object.keys(Rental.schema.paths));
*/

module.exports = mongoose.model('Rental', rentalSchema);


