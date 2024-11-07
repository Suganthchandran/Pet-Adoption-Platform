const express = require('express');
const OrderRoute = express.Router();
const orderController = require('../controllers/OrderController');

OrderRoute.post('/create', orderController.createOrder);
OrderRoute.post('/confirm-stripe', orderController.confirmStripePayment);
OrderRoute.get('/', orderController.getAllOrders);
OrderRoute.post('/verifyStripe', orderController.verifyStripePayment);
OrderRoute.post('/status', orderController.updateStatus)

module.exports = OrderRoute;
