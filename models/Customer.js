const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        // required: true,
    },
    mobileNumber: {
        type: String,
        unique: true,
        // required: true,
    },
    creditBalance: {
        type: Number,
        // default: 0,
    },


    
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;