const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Body Parser Middleware
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// MongoDB URI fallback (Local DB 'portfolio' if not specified in .env)
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Connect to MongoDB
console.log('Connecting to MongoDB...');
mongoose.connect(mongoURI)
  .then(() => {
    console.log('[DB] MongoDB database connection established successfully.');
  })
  .catch(err => {
    console.error('[DB Error] Failed to connect to MongoDB:', err.message);
    console.log('Proceeding with server activation in mock-DB backup mode. Submissions will be logged.');
  });

// Serve static assets if in production
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`[Server] Express server running on port: ${PORT}`);
});
// Trigger database reload
