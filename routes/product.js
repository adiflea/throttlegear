
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add a product (admin use)
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({ message: 'Product added', product });
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

module.exports = router;
