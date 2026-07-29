const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Security Headers (Helmet)
// Disable contentSecurityPolicy restrictions to prevent script blocking in custom web browsers
app.use(helmet({ contentSecurityPolicy: false }));

// 2. Enable CORS
app.use(cors());

// 3. Compression Middleware (GZip/Deflate compression for fast loads)
app.use(compression());

// 4. API Throttling & DDoS Protection (Rate Limiter)
// Limits client to 100 requests per 15 minutes window
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { error: 'Too many requests from this IP, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// 5. Body Parser Middleware
app.use(express.json());

// 6. Mount API Routes
app.use('/api', apiRoutes);

// MongoDB URI fallback (Local DB 'portfolio' if not specified in .env)
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Mongoose Connection Pool Options for high scalability and automatic failover
const mongooseOptions = {
  maxPoolSize: 10,            // Maintain up to 10 open socket connections
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of hanging
  socketTimeoutMS: 45000,     // Close inactive sockets after 45 seconds
};

// Connect to MongoDB
console.log('Connecting to MongoDB...');
mongoose.connect(mongoURI, mongooseOptions)
  .then(() => {
    console.log('[DB] MongoDB database connection established successfully.');
  })
  .catch(err => {
    console.error('[DB Error] Failed to connect to MongoDB:', err.message);
    console.log('Proceeding with server activation in mock-DB backup mode. Submissions will be logged.');
  });

// 7. CDN Cache Control & Static Assets Serving (Production)
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  // Serve static assets with explicit browser/CDN caching headers
  app.use(express.static(path.join(__dirname, '../client/dist'), {
    maxAge: '1y',
    setHeaders: (res, filePath) => {
      // Don't cache HTML files so users always receive latest redeploys instantly
      if (path.extname(filePath) === '.html') {
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      } else {
        // Cache hashed assets (JS/CSS/images) forever (1 year)
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  }));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`[Server] Express server running on port: ${PORT}`);
});
// Trigger database reload
