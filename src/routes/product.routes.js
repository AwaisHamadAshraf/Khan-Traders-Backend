const express = require('express');
const router = express.Router();

// Mock product data
const products = [
  {
    _id: 'prod-1',
    name: 'Bio-Fertilizer Pro',
    category: 'Fertilizer',
    price: 1200,
    stock: 45,
    supplier: 'EcoAgro Systems',
    description: 'High-quality organic fertilizer for all crops',
    image: 'https://via.placeholder.com/150'
  },
  {
    _id: 'prod-2',
    name: 'Crop Shield Pesticide',
    category: 'Pesticide',
    price: 1500,
    stock: 30,
    supplier: 'GreenProtect Ltd',
    description: 'Effective pesticide that protects crops from common pests',
    image: 'https://via.placeholder.com/150'
  },
  {
    _id: 'prod-3',
    name: 'Growth Booster X2',
    category: 'Growth Hormones',
    price: 2200,
    stock: 18,
    supplier: 'AgriGenetics',
    description: 'Advanced growth hormone for accelerated plant development',
    image: 'https://via.placeholder.com/150'
  },
  {
    _id: 'prod-4',
    name: 'Soil Health Tester',
    category: 'Equipment',
    price: 3500,
    stock: 10,
    supplier: 'AgriTech Solutions',
    description: 'Digital soil analyzer for measuring pH and nutrient levels',
    image: 'https://via.placeholder.com/150'
  },
  {
    _id: 'prod-5',
    name: 'Drip Irrigation Kit',
    category: 'Equipment',
    price: 4200,
    stock: 8,
    supplier: 'WaterSave Systems',
    description: 'Complete drip irrigation system for efficient water usage',
    image: 'https://via.placeholder.com/150'
  }
];

// Get all products
router.get('/', (req, res) => {
  res.json({ success: true, products });
});

// Get product by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p._id === id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  res.json({ success: true, product });
});

// Create product
router.post('/', (req, res) => {
  const newProduct = {
    _id: 'prod-' + (products.length + 1),
    ...req.body
  };
  
  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product: newProduct
  });
});

// Update product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  
  res.json({
    success: true,
    message: 'Product updated successfully',
    product: {
      _id: id,
      ...req.body
    }
  });
});

// Delete product
router.delete('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Product deleted successfully'
  });
});

module.exports = router; 