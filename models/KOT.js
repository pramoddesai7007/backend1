const mongoose = require('mongoose')
const { Schema } = mongoose;

const KOTSchema = new mongoose.Schema({
    tableId:
    {
        type: String,
        required: true
    },
    items:
        [{
            name: String,

            quantity: Number
        }],

    KOTDate: {
        type: Date,
        default: Date.now // Set as the current Date and Time when the order is saved
    },

    orderNumber: {
        type: String, // Assuming orderNumber is a string
        // required: true,
        unique: true,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tastes: {
        type: String,
    },
    waiterName: {
        type: String,
    },

});


const KOT = mongoose.model('KOT', KOTSchema);
module.exports = KOT