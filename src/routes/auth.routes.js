const express = require('express');
const router = express.Router();

// Mock login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // For demo purposes
  if ((username === 'admin' && password === 'admin123') ||
      (username === 'manager' && password === 'manager123') ||
      (username === 'user' && password === 'user123')) {
    
    // Create a mock user based on role
    const user = {
      _id: `demo-${username}-id`,
      username,
      firstName: username.charAt(0).toUpperCase() + username.slice(1),
      lastName: 'User',
      email: `${username}@khantraders.com`,
      role: username
    };
    
    // Create a mock token
    const token = 'demo-token-' + Math.random().toString(36).substring(2);
    
    return res.json({
      success: true,
      token,
      user
    });
  }
  
  return res.status(401).json({
    success: false,
    message: 'Invalid username or password'
  });
});

// Register endpoint
router.post('/register', (req, res) => {
  res.json({
    success: true,
    message: 'User registered successfully (demo)',
    user: {
      _id: 'demo-user-id',
      ...req.body,
      role: 'user'
    }
  });
});

// Forgotten password endpoint
router.post('/forgot-password', (req, res) => {
  res.json({
    success: true,
    message: 'Password reset instructions sent (demo)'
  });
});

module.exports = router; 