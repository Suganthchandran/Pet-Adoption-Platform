const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  weights: {
    type: Object,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    deliveryInfo: {
      firstName: String,
      lastName: String,
      email: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      phone: String,
    },
    cartItems: [cartItemSchema], 
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['cod', 'stripe'],
      required: true,
    },
    orderStatus: {
      type: String,
      default: 'Shipped',
    },
    paymentStatus: {
      type: String,
      default: 'unpaid',
    },
  },
  { timestamps: true } 
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
