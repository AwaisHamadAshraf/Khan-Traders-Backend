// This file is a Vercel serverless function entry point
// It exports the Express app from the main server file

// Import the Express app
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

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
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/khan-traders';
const NODE_ENV = process.env.NODE_ENV || 'development';
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3000', 'https://khan-traders.vercel.app'];

// CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.indexOf(origin) === -1) {
      // In development, allow all origins if NODE_ENV is 'development'
      if (NODE_ENV === 'development') {
        return callback(null, true);
      }
      return callback(new Error('CORS policy violation'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Khan Traders API',
    environment: NODE_ENV,
    mongodb: MONGODB_URI.includes('@') 
      ? MONGODB_URI.replace(/mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/, 'mongodb$1://$2:****@') 
      : 'mongodb://localhost:27017/khan-traders'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: NODE_ENV === 'development' ? err : {}
  });
});

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    console.error('The application will continue to run, but database functionality will not work.');
  });

// Export the Express app for Vercel serverless functions
module.exports = app; 