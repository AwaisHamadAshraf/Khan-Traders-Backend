// This file is a Vercel serverless function entry point
// It exports the Express app from the main server file

// Import the Express app
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import demo data handlers
const { setupDemoRoutes } = require('./demo-data');

// Load environment variables
dotenv.config();

// Routes
const authRoutes = require('../src/routes/auth.routes');
const userRoutes = require('../src/routes/user.routes');
const productRoutes = require('../src/routes/product.routes');
const salesRoutes = require('../src/routes/sales.routes');

// Create Express app
const app = express();

// Set environment variables with fallback values
const MONGODB_URI = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV || 'development';
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3000', 'https://khan-traders.vercel.app'];

// CORS configuration with more permissive settings for serverless
app.use(cors({
  origin: '*', // Allow all origins in production for now
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Root route (always works regardless of database)
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Khan Traders API',
    environment: NODE_ENV,
    mongodbConnected: mongoose.connection.readyState === 1,
    demoMode: !MONGODB_URI || mongoose.connection.readyState !== 1,
    loginCredentials: !MONGODB_URI ? {
      username: 'admin',
      password: 'admin123'
    } : null
  });
});

// Health check endpoint (always works regardless of database)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    mongodbConnected: mongoose.connection.readyState === 1
  });
});

// API routes - only register if MongoDB is connected
let dbConnected = false;

// Connect to MongoDB only if MONGODB_URI is provided
if (MONGODB_URI) {
  try {
    mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Connected to MongoDB successfully');
        dbConnected = true;
        
        // Register API routes only after successful DB connection
        app.use('/api/auth', authRoutes);
        app.use('/api/users', userRoutes);
        app.use('/api/products', productRoutes);
        app.use('/api/sales', salesRoutes);
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err.message);
        console.error('API routes will use demo data.');
        
        // Setup demo routes since DB connection failed
        setupDemoRoutes(app);
      });
  } catch (error) {
    console.error('Error in MongoDB connection setup:', error.message);
    setupDemoRoutes(app);
  }
} else {
  console.log('No MONGODB_URI provided. Running in demo mode.');
  setupDemoRoutes(app);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Express error handler:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: NODE_ENV === 'development' ? err : {}
  });
});

// Export the Express app for Vercel serverless functions
module.exports = app; 