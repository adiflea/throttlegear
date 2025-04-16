
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  items: Array,
  total: Number,
  paymentMethod: String,
  placedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
