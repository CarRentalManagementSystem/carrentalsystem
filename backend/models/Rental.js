// rental model, for renting
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    rentedDate: { type: Date, required: true },
    returnedDate: { type: Date, required: true },
    totalRentalFee: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['paid'], default: 'paid' },
    rentalStatus: { type: String, enum: ['booked', 'inuse', 'cancelled'], default: 'booked' },

},
    { timestamps: true } // add timestamps to record time
);
/*
//fix issue, to avoid conflict
delete mongoose.models['Rental'];
// creat a model (new collection)
const Rental = mongoose.model('Rental', rentalSchema);
// log the schema to confirm
console.log("Rental Schema Paths (models/Rental.js):", Object.keys(Rental.schema.paths));
*/

module.exports = mongoose.model('Rental', rentalSchema);


