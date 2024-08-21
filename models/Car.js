// models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    fuelType: {
        type: String,
        required: true,
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    rent: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
