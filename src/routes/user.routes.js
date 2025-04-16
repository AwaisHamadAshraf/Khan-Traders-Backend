const express = require('express');
const router = express.Router();

// Get all users
router.get('/', (req, res) => {
  // Mock data
  const users = [
    {
      _id: 'demo-admin-id',
      username: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@khantraders.com',
      role: 'admin'
    },
    {
      _id: 'demo-manager-id',
      username: 'manager',
      firstName: 'Manager',
      lastName: 'User',
      email: 'manager@khantraders.com',
      role: 'manager'
    },
    {
      _id: 'demo-user-id',
      username: 'user',
      firstName: 'Regular',
      lastName: 'User',
      email: 'user@khantraders.com',
      role: 'user'
    }
  ];
  
  res.json({ success: true, users });
});

// Get user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  // Find the appropriate mock user based on ID
  let user;
  if (id.includes('admin')) {
    user = {
      _id: 'demo-admin-id',
      username: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@khantraders.com',
      role: 'admin'
    };
  } else if (id.includes('manager')) {
    user = {
      _id: 'demo-manager-id',
      username: 'manager',
      firstName: 'Manager',
      lastName: 'User',
      email: 'manager@khantraders.com',
      role: 'manager'
    };
  } else {
    user = {
      _id: 'demo-user-id',
      username: 'user',
      firstName: 'Regular',
      lastName: 'User',
      email: 'user@khantraders.com',
      role: 'user'
    };
  }
  
  res.json({ success: true, user });
});

// Update user
router.put('/:id', (req, res) => {
  const { id } = req.params;
  
  // Mock response with updated data
  res.json({
    success: true,
    message: 'User updated successfully',
    user: {
      _id: id,
      ...req.body
    }
  });
});

// Delete user
router.delete('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

module.exports = router; 