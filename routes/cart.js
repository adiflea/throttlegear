
const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

// Get cart for logged-in user
router.get('/', async (req, res) => {
  const userId = req.session.user?._id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const cart = await CartItem.find({ userId });
  res.json(cart);
});

// Add item to cart
router.post('/', async (req, res) => {
  const userId = req.session.user?._id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const { productId, name, price, size, quantity, image } = req.body;

  // Check if item already in cart
  const existing = await CartItem.findOne({ userId, productId, size });
  if (existing) {
    existing.quantity += quantity;
    await existing.save();
    return res.json({ message: 'Quantity updated', cartItem: existing });
  }

  const item = new CartItem({ userId, productId, name, price, size, quantity, image });
  await item.save();
  res.json({ message: 'Item added', cartItem: item });
});

// Remove item from cart
router.delete('/:id', async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item removed' });
});

// Update quantity
router.put('/:id', async (req, res) => {
  const item = await CartItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  item.quantity = req.body.quantity;
  await item.save();
  res.json({ message: 'Quantity updated', cartItem: item });
});

module.exports = router;
