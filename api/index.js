// Serverless-optimized Express app for Vercel
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import demo data
const { setupDemoRoutes } = require('./demo-data');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS configuration - essential for frontend to communicate with API
app.use(cors({
  origin: '*', // Allow all origins in serverless environment
  credentials: true
}));

// Middleware - keep minimal for faster cold starts
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route - fast response for health checks
app.get('/', (req, res) => {
  res.json({ 
    message: 'Khan Traders API is running',
    environment: NODE_ENV,
    mode: 'serverless',
    loginCredentials: {
      username: 'admin',
      password: 'admin123'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString()
  });
});

// Setup demo routes - these work without database
setupDemoRoutes(app);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: NODE_ENV === 'development' ? err : {}
  });
});

// Export the Express app for Vercel serverless functions
module.exports = app; 