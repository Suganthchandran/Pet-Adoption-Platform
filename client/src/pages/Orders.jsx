import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Orders.css';
import { UserContext } from '../../context/UserContext';

const Orders = () => {
  const { currency, user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!user || !user.uid) {
      // Handle the case where user is not logged in
      console.error('User not logged in');
      return;
    }
    try {
      const response = await axios.get('/api/orders');
      if (response.data.success) {
        const userOrders = response.data.orders.filter(order => order.userId === user.uid);
        setOrders(userOrders.reverse());
        console.log('Order List: ', userOrders);
        fetchProductDetails(userOrders);
      }
    } catch (error) {
      console.error('Error fetching Orders:', error);
      setLoading(false);
    }
  };

  const fetchProductDetails = async (orders) => {
    const productIds = Array.from(
      new Set(orders.flatMap(order => order.cartItems.map(item => item.productId)))
    );

    try {
      const response = await axios.post('http://localhost:8086/api/product/details', { productIds });
      console.log('Product details response:', response.data);

      if (response.data.success) {
        const detailsMap = response.data.products.reduce((acc, product) => {
          acc[product._id] = product;
          return acc;
        }, {});
        setProductDetails(detailsMap);
      } else {
        console.error('Error fetching product details:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  useEffect(() => {
    console.log('Product Details:', productDetails);
  }, [productDetails]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='order'>
      <div className='order-start'>
        <h1>MY ORDERS</h1>
      </div>

      <div>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className='order-main'>
             <div className='orders-head'>
                         <div className='order-details'>
                <h3 style={{fontSize:'1.5rem'}}>Order ID: {order._id}</h3>
               <div className='order-mini-content'>
                <div>Payment Status: {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}</div>
                <div>Total Amount: {currency} {order.totalAmount}</div>
                <div>Payment Method: {order.paymentMethod}</div>
                <div>Date: {new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

             
              </div>

              <div className='order-main-contents'>

              <div className='order-items'>
                {order.cartItems.map((item, index) => {
                  const product = productDetails[item.productId] || {};

                  const weights = item.weights || {};

                  return (
                    <div key={index}>
                      {product.name ? (
                        <div className='order-item'>
                          <img
                            className='order-content-image'
                            src={product.image || 'placeholder.jpg'}
                            alt={product.name || 'Product'}
                          />
                          <div className='order-contents'>
                            <div>
                          <p style={{fontSize:'1.2rem',fontWeight:'700'}}>{product.name}</p>
                          </div>
                          <div>
                          {Object.keys(weights).map((weightKey, weightIndex) => {
                            const weightQuantity = weights[weightKey];
                            return (

                              <div style={{display:'flex',flexDirection:'column',color:'grey'}} key={weightIndex}>
                               <div> Weight: {weightKey} </div>
                               <div> Quantity: {weightQuantity} </div>
                              </div>
                            );
                          })}
                          </div>
                          </div>
                        </div>
                      ) : (
                        <p>Loading product details...</p>
                      )}
                    </div>
                  );
                })}


              </div>

              <div className='order-shipping'>
                <div className='order-shipping-content'>
                  <p className='order-shipping-circle'></p>
                  <p>Shipping Status: {order.orderStatus}</p>
                </div>
              </div>

              <div>
                <button onClick={fetchOrders} className='order-track'>Track Order</button>
              </div>

              </div>

             
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
