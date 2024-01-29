const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();

router.post('/customer/list/add-customer', async (req, res) => {
    try {
        const { customerName, mobileNumber, creditBalance } = req.body;
        console.log('Incoming Add Customer Request Data:', req.body);  // Log the incoming data

        // Check if the customer already exists
        const existingCustomer = await Customer.findOne({ mobileNumber });
        if (existingCustomer) {
            return res.status(400).json({ error: 'Customer already exists' });
        }

        // Ensure creditBalance is a number, default to 0 if not provided
        const newCustomer = new Customer({
            customerName,
            mobileNumber,
            creditBalance: parseFloat(creditBalance) || 0
        });

        const savedCustomer = await newCustomer.save();

        res.json(savedCustomer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/get-customer-by-mobile/:mobileNumber', async (req, res) => {
    try {
        const { mobileNumber } = req.params;

        // Find the customer by mobile number
        const customer = await Customer.findOne({ mobileNumber });

        if (!customer) {
            res.status(404).json({ error: 'Customer not found' });
        } else {
            res.json(customer);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.patch('/update-credit-balance/:customerId', async (req, res) => {
    try {
        const { customerId } = req.params;
        const { creditBalance } = req.body;

        // Check if the customer exists
        const existingCustomer = await Customer.findById(customerId);

        if (!existingCustomer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Ensure creditBalance is a number
        existingCustomer.creditBalance = parseFloat(creditBalance) || 0;

        const updatedCustomer = await existingCustomer.save();

        res.json(updatedCustomer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;