// Demo data and handlers for serverless functions
const demoUsers = [
  {
    _id: '1',
    username: 'admin',
    email: 'admin@khantraders.com',
    role: 'admin',
    name: 'Admin User',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    username: 'user',
    email: 'user@khantraders.com',
    role: 'user',
    name: 'Regular User',
    createdAt: new Date().toISOString()
  }
];

const demoProducts = [
  {
    _id: '1',
    name: 'Rice (5kg)',
    category: 'Grains',
    price: 25.99,
    quantity: 100,
    description: 'Premium Basmati Rice',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    name: 'Wheat Flour (10kg)',
    category: 'Flour',
    price: 15.99,
    quantity: 150,
    description: 'Fine wheat flour for baking',
    createdAt: new Date().toISOString()
  },
  {
    _id: '3',
    name: 'Sugar (1kg)',
    category: 'Essentials',
    price: 4.99,
    quantity: 200,
    description: 'Refined white sugar',
    createdAt: new Date().toISOString()
  },
  {
    _id: '4',
    name: 'Cooking Oil (5L)',
    category: 'Oils',
    price: 12.50,
    quantity: 80,
    description: 'Pure vegetable cooking oil',
    createdAt: new Date().toISOString()
  },
  {
    _id: '5',
    name: 'Lentils (2kg)',
    category: 'Pulses',
    price: 8.99,
    quantity: 120,
    description: 'Red split lentils',
    createdAt: new Date().toISOString()
  }
];

const demoCustomers = [
  {
    _id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '555-1234',
    address: '123 Main St'
  },
  {
    _id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '555-5678',
    address: '456 Oak Ave'
  }
];

const demoSales = [
  {
    _id: '1',
    customer: {
      _id: '1',
      name: 'John Smith',
    },
    items: [
      { product: { _id: '1', name: 'Rice (5kg)' }, quantity: 2, price: 25.99 },
      { product: { _id: '3', name: 'Sugar (1kg)' }, quantity: 1, price: 4.99 }
    ],
    totalAmount: 56.97,
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    paymentStatus: 'paid',
    paymentMethod: 'cash'
  },
  {
    _id: '2',
    customer: {
      _id: '2',
      name: 'Sarah Johnson',
    },
    items: [
      { product: { _id: '2', name: 'Wheat Flour (10kg)' }, quantity: 1, price: 15.99 },
      { product: { _id: '4', name: 'Cooking Oil (5L)' }, quantity: 2, price: 12.50 }
    ],
    totalAmount: 40.99,
    date: new Date().toISOString(), // Today
    paymentStatus: 'pending',
    paymentMethod: 'credit'
  }
];

// Demo JWT token generation
const generateToken = (user) => {
  return 'demo-jwt-token-' + user._id;
};

// Demo route handlers
const demoHandlers = {
  // Auth handlers
  login: (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
      const user = demoUsers[0];
      return res.json({
        user,
        token: generateToken(user)
      });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
  },
  
  register: (req, res) => {
    // Just return success for demo
    return res.status(201).json({ 
      message: 'User registered successfully in demo mode',
      note: 'This is a simulated response. No user was actually created.'
    });
  },
  
  profile: (req, res) => {
    return res.json(demoUsers[0]);
  },
  
  // User handlers
  getUsers: (req, res) => {
    return res.json(demoUsers);
  },
  
  getUserById: (req, res) => {
    const user = demoUsers.find(u => u._id === req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  },
  
  // Product handlers
  getProducts: (req, res) => {
    return res.json(demoProducts);
  },
  
  getProductById: (req, res) => {
    const product = demoProducts.find(p => p._id === req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  },
  
  createProduct: (req, res) => {
    // Just return success for demo
    return res.status(201).json({
      ...req.body,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      note: 'This is a simulated response. No product was actually created.'
    });
  },
  
  // Sales handlers
  getSales: (req, res) => {
    return res.json(demoSales);
  },
  
  getSaleById: (req, res) => {
    const sale = demoSales.find(s => s._id === req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.json(sale);
  },
  
  createSale: (req, res) => {
    // Just return success for demo
    return res.status(201).json({
      ...req.body,
      _id: Date.now().toString(),
      date: new Date().toISOString(),
      note: 'This is a simulated response. No sale was actually created.'
    });
  },
  
  // Customers
  getCustomers: (req, res) => {
    return res.json(demoCustomers);
  }
};

// Setup demo routes on the Express app
const setupDemoRoutes = (app) => {
  // Auth routes
  app.post('/api/auth/login', demoHandlers.login);
  app.post('/api/auth/register', demoHandlers.register);
  app.get('/api/auth/profile', demoHandlers.profile);
  
  // User routes
  app.get('/api/users', demoHandlers.getUsers);
  app.get('/api/users/:id', demoHandlers.getUserById);
  
  // Product routes
  app.get('/api/products', demoHandlers.getProducts);
  app.get('/api/products/:id', demoHandlers.getProductById);
  app.post('/api/products', demoHandlers.createProduct);
  app.put('/api/products/:id', demoHandlers.createProduct); // Reuse handler
  
  // Sales routes
  app.get('/api/sales', demoHandlers.getSales);
  app.get('/api/sales/:id', demoHandlers.getSaleById);
  app.post('/api/sales', demoHandlers.createSale);
  
  // Customer routes
  app.get('/api/customers', demoHandlers.getCustomers);
  
  // Return a notice for all other API routes
  app.use('/api/*', (req, res) => {
    return res.status(501).json({
      message: 'This endpoint is not implemented in serverless demo mode',
      availableEndpoints: [
        '/api/auth/login (POST)',
        '/api/auth/register (POST)',
        '/api/auth/profile (GET)',
        '/api/users (GET)',
        '/api/users/:id (GET)',
        '/api/products (GET)',
        '/api/products/:id (GET)',
        '/api/products (POST)',
        '/api/products/:id (PUT)',
        '/api/sales (GET)',
        '/api/sales/:id (GET)',
        '/api/sales (POST)',
        '/api/customers (GET)'
      ]
    });
  });
};

module.exports = {
  demoUsers,
  demoProducts,
  demoSales,
  demoCustomers,
  demoHandlers,
  setupDemoRoutes
}; 