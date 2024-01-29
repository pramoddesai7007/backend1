// routes/kot.js

const express = require('express');
const router = express.Router();
const KOT = require('../models/KOT');


router.post('/kotOrder/:tableId', async (req, res) => {
  try {
    const { tableId } = req.params;
    const { items,tastes, waiterName, } = req.body;

    const orderNumber = `${tableId}`;

    const newKOT = new KOT({
      tableId,
      items,
      orderNumber,
      tastes,
      waiterName,
    });

    const savedKOT = await newKOT.save();

    res.json(savedKOT);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get KOT by Table ID
router.get('/kot/:tableId', async (req, res) => {
  try {
    const { tableId } = req.params;
    const kot = await KOT.findOne({ tableId }).sort({ createdAt: -1 });
    res.status(200).json(kot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;