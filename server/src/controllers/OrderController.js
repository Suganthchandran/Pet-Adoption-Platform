const Order = require('../modals/OrderModel');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
  try {
    const {
      userId,
      deliveryInfo,
      cartItems,
      totalAmount,
      paymentMethod,
    } = req.body;

    const itemsArray = Object.entries(cartItems).map(([productId, weights]) => ({
      productId,
      weights,
    }));
    
    const order = new Order({
      userId,
      deliveryInfo,
      cartItems: itemsArray,
      totalAmount,
      paymentStatus: (paymentMethod === 'stripe' ? 'paid' : 'unpaid') ,
      paymentMethod,
    });

    const savedOrder = await order.save();

    if (paymentMethod === 'stripe') {
      const lineItems = Object.entries(cartItems).map(([productId, details]) => {
        const quantity = Object.values(details).reduce((acc, qty) => acc + qty, 0);
        if (isNaN(totalAmount) || totalAmount <= 0) {
          throw new Error(`Invalid price for product ${productId}: ${totalAmount}`);
        }
        
        return {
          price_data: {
            currency: 'inr',
            product_data: {
              name: productId,
            },
            unit_amount: totalAmount * 100,
          },
          quantity,
        };
      });
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/orders`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
        metadata: {
          orderId: savedOrder._id.toString(),
        },
      });

      return res.status(200).json({
        success: true,
        message: 'Order created and Stripe checkout session created',
        order: savedOrder,
        stripeCheckoutUrl: session.url,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: savedOrder,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Failed to place the order', error });
  }
};

exports.confirmStripePayment = async (req, res) => {
  const { sessionId } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const orderId = session.metadata.orderId;
      const order = await Order.findById(orderId);
      
      order.paymentStatus = 'paid';
      await order.save();

      res.status(200).json({ success: true, message: 'Payment confirmed' });
    } else {
      res.status(400).json({ success: false, message: 'Payment not successful' });
    }
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.verifyStripePayment = async (req, res) => {
  const { success, orderId } = req.body;

  if (!success || !orderId) {
      return res.status(400).json({ success: false, message: "Invalid data" });
  }

  try {
      const paymentStatus = await verifyStripePayment(orderId);

      if (paymentStatus === 'paid') {
          await Order.update({ status: 'paid' }, { where: { id: orderId } });
          return res.status(200).json({ success: true });
      }

      return res.status(400).json({ success: false, message: "Payment verification failed" });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      message: 'All orders fetched successfully',
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error });
  }
};

exports.updateStatus = async (req,res)=> {
  try {
      const {orderId, orderStatus} = req.body;
      await Order.findByIdAndUpdate(orderId,{orderStatus});

      res.json({
          success: true,
          message: 'Order Status Updated'
      })
  }
  catch(error) {
      res.json({
          success: false,
          message: error.message
      })
  }
}