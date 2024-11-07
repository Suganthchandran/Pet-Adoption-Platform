const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,  // Stores product ID
    required: true,
  },
  weights: {
    type: Object,  // Stores sizes/weights as key-value pairs (e.g., {'1kg': 1})
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,  // Store Firebase UID as a string
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
    cartItems: [cartItemSchema],  // Array of cart items using the sub-schema
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
      default: 'Pending',
    },
    paymentStatus: {
      type: String,
      default: 'unpaid',
    },
  },
  { timestamps: true } // Add timestamps to automatically include createdAt and updatedAt fields
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
