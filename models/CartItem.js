
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  name: String,
  price: Number,
  size: String,
  quantity: Number,
  image: String
});

module.exports = mongoose.model('CartItem', cartItemSchema);
