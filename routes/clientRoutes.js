const express = require('express');
const router = express.Router();
const Client = require('../controllers/ClientController');

// POST route to create a new client
router.post('/create', async (req, res) => {
  try {
    const { name, number } = req.body;

    // Validate input
    if (!name || !number) {
      return res.status(400).json({ message: 'Name and number are required' });
    }

    // Create a new client instance
    const newClient = new Client({
      name: name,
      number: number
    });

    // Save the client to the database
    const savedClient = await newClient.save();
    
    res.status(201).json({
      message: 'Client created successfully',
      client: savedClient
    });
  } catch (error) {
    console.error('Error creating new client:', error);
    res.status(500).json({ message: 'Error creating client', error: error.message });
  }
});

module.exports = router;