const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
  productName: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: false },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
