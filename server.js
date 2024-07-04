const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRouter = require('./routes/auth');


dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error(err);
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB

// Define routes here
app.use('/api/auth', authRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
