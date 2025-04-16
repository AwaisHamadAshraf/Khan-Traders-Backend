const express = require('express');
const router = express.Router();

// Generate monthly sales data for the current year
const generateMonthlySalesData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = months.map((month, index) => {
    // Generate random sales between 5,000 and 50,000
    const amount = Math.floor(Math.random() * 45000) + 5000;
    return {
      month,
      amount,
      monthIndex: index
    };
  });
  
  return data;
};

// Generate daily sales data for a specific month
const generateDailySalesData = (month) => {
  // Determine days in month (simplified)
  let daysInMonth = 31;
  if (['Apr', 'Jun', 'Sep', 'Nov'].includes(month)) {
    daysInMonth = 30;
  } else if (month === 'Feb') {
    daysInMonth = 28;
  }
  
  const data = [];
  
  for (let day = 1; day <= daysInMonth; day++) {
    // Generate random sales between 0 and 5,000
    // Some days might have zero or very low sales
    const amount = Math.random() < 0.2 ? 0 : Math.floor(Math.random() * 5000);
    
    data.push({
      day,
      amount
    });
  }
  
  return data;
};

// Mock recent sales data
const recentSales = [
  { id: 1, customer: 'Ahmed Farms', date: '2023-06-10', amount: 12500, status: 'Completed' },
  { id: 2, customer: 'Rahman Agriculture', date: '2023-06-09', amount: 8200, status: 'Completed' },
  { id: 3, customer: 'Hassan Fields', date: '2023-06-08', amount: 5600, status: 'Pending' },
  { id: 4, customer: 'Malik Croppers', date: '2023-06-07', amount: 9800, status: 'Completed' },
  { id: 5, customer: 'Sindh Farmers', date: '2023-06-06', amount: 4300, status: 'Pending' },
];

// Get monthly sales data
router.get('/monthly', (req, res) => {
  const salesData = generateMonthlySalesData();
  res.json({ success: true, salesData });
});

// Get daily sales data for a specific month
router.get('/daily/:month', (req, res) => {
  const { month } = req.params;
  const salesData = generateDailySalesData(month);
  res.json({ success: true, salesData });
});

// Get recent sales
router.get('/recent', (req, res) => {
  res.json({ success: true, sales: recentSales });
});

// Get sales by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sale = recentSales.find(s => s.id === parseInt(id));
  
  if (!sale) {
    return res.status(404).json({
      success: false,
      message: 'Sale not found'
    });
  }
  
  res.json({ success: true, sale });
});

// Create new sale
router.post('/', (req, res) => {
  const newSale = {
    id: recentSales.length + 1,
    date: new Date().toISOString().split('T')[0],
    status: 'Pending',
    ...req.body
  };
  
  res.status(201).json({
    success: true,
    message: 'Sale created successfully',
    sale: newSale
  });
});

// Update sale
router.put('/:id', (req, res) => {
  const { id } = req.params;
  
  res.json({
    success: true,
    message: 'Sale updated successfully',
    sale: {
      id: parseInt(id),
      ...req.body
    }
  });
});

module.exports = router; 