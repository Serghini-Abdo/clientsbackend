// Assuming you've already required and set up your Mongoose connection
const Client = require('./path/to/your/client/model');

const createNewClient = async (req, res) => {
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
  }
// Function to create a new client
// async function createNewClient(name, number) {
//   try {
//     // Create a new client instance
//     const newClient = new Client({
//       name: name,
//       number: number
//       // factures will be automatically initialized with an empty facture
//       // due to the pre-save middleware we set up
//     });

//     // Save the client to the database
//     const savedClient = await newClient.save();
    
//     console.log('New client created:', savedClient);
//     return savedClient;
//   } catch (error) {
//     console.error('Error creating new client:', error);
//     throw error;
//   }
// }

// Usage
// createNewClient('John Doe', '1234567890')
//   .then(client => {
//     console.log('Client created successfully');
//   })
//   .catch(error => {
//     console.error('Failed to create client');
//   });

  module.exports={createNewClient};