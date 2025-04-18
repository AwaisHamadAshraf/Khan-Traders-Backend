// Demo data and handlers for when database is not available
const demoUsers = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@khantraders.com',
    role: 'admin',
    name: 'Admin User',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    username: 'user',
    email: 'user@khantraders.com',
    role: 'user',
    name: 'Regular User',
    createdAt: new Date().toISOString()
  }
];

const demoProducts = [
  {
    id: '1',
    name: 'Rice (5kg)',
    category: 'Grains',
    price: 25.99,
    quantity: 100,
    description: 'Premium Basmati Rice',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Wheat Flour (10kg)',
    category: 'Flour',
    price: 15.99,
    quantity: 150,
    description: 'Fine wheat flour for baking',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Sugar (1kg)',
    category: 'Essentials',
    price: 4.99,
    quantity: 200,
    description: 'Refined white sugar',
    createdAt: new Date().toISOString()
  }
];

const demoSales = [
  {
    id: '1',
    customerId: '1',
    customerName: 'Demo Customer',
    items: [
      { productId: '1', quantity: 2, price: 25.99, name: 'Rice (5kg)' },
      { productId: '3', quantity: 1, price: 4.99, name: 'Sugar (1kg)' }
    ],
    total: 56.97,
    date: new Date().toISOString(),
    paymentStatus: 'paid',
    paymentMethod: 'cash'
  }
];

// Demo route handlers
const demoHandlers = {
  // Auth handlers
  login: (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
      return res.json({
        user: demoUsers[0],
        token: 'demo-jwt-token'
      });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
  },
  
  // Product handlers
  getProducts: (req, res) => {
    return res.json(demoProducts);
  },
  
  getProductById: (req, res) => {
    const product = demoProducts.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  },
  
  // Sales handlers
  getSales: (req, res) => {
    return res.json(demoSales);
  }
};

// Setup demo routes on the Express app
const setupDemoRoutes = (app) => {
  app.post('/api/auth/login', demoHandlers.login);
  app.get('/api/products', demoHandlers.getProducts);
  app.get('/api/products/:id', demoHandlers.getProductById);
  app.get('/api/sales', demoHandlers.getSales);
  
  // Return a notice for all other API routes
  app.use('/api/*', (req, res, next) => {
    // If we get here, it means the route wasn't handled by a demo handler
    return res.status(503).json({
      message: 'This endpoint is not available in demo mode',
      note: 'The application is running without a database connection',
      availableEndpoints: [
        '/api/auth/login (POST)',
        '/api/products (GET)',
        '/api/products/:id (GET)',
        '/api/sales (GET)'
      ]
    });
  });
};

module.exports = {
  demoUsers,
  demoProducts,
  demoSales,
  demoHandlers,
  setupDemoRoutes
}; 