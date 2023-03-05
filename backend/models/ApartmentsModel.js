const mongoose = require('mongoose')

const ApartmentSchema = new mongoose.Schema({
    Apartment: {
        type: String,
        required: true
    },
    Rent_Price: {
        type: String,
        required: true,
        default: new Date()
    },
    Rented: {
        type: String,
        required: true
    },
    Expiry_Date: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model('Apartment', ApartmentSchema)