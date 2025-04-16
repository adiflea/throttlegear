
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const CartItem = require('../models/CartItem');

// Place new order
router.post('/', async (req, res) => {
  const userId = req.session.user?._id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const { items, total, paymentMethod } = req.body;

  const order = new Order({
    userId,
    items,
    total,
    paymentMethod
  });

  await order.save();
  await CartItem.deleteMany({ userId }); // clear cart after order

  res.json({ message: 'Order placed successfully', order });
});

// Get all orders (for admin)
router.get('/', async (req, res) => {
  const orders = await Order.find().sort({ placedAt: -1 });
  res.json(orders);
});

module.exports = router;
