import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Orders.css';
import { UserContext } from '../../context/UserContext';
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Orders = () => {
  const { currency, user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {

    try {
      const response = await axios.get('/api/orders');
      if (response.data.success) {
        const userOrders = response.data.orders.filter(order => order.userId === user.uid);
        setOrders(userOrders.reverse());
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
     <Navbar/>
    <section className="home-image69" style={{ backgroundImage: `url(${assets.orderImage})` }}>
                <div className="overlay69"></div>
            </section>
    <div className='order'>
      <div className='order-start'>
        <h1>MY ORDERS</h1>
      </div>

      <div>

      {!user || !user.uid ? (
          <div className="empty-cart">
            <h1 className="empty-cart-message">Login to See Your Orders!</h1>
            <img src={assets.no_cart} alt="Empty Cart" className="empty-cart-image" />
          </div>
        ) : (

        orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className='order-main'>
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

              <div className='order-mini-content'>
                <div>Payment Status: {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}</div>
                <div>Total Amount: {currency} {order.totalAmount}</div>
                <div>Payment Method: {order.paymentMethod}</div>
                <div>Date: {new Date(order.createdAt).toLocaleDateString()}</div>
                </div>



              <div className='order-shipping'>
                <div className='order-shipping-content'>
                  <p className='order-shipping-circle'></p>
                  <p>Shipping Status: {order.orderStatus}</p>
                </div>
              </div>

              <div className='order-track-order'>
                <button onClick={fetchOrders} className='order-track'>Track Order</button>
              </div>

              </div>

             
            </div>
          ))
        ) : (
          <div className='no-order-container'>
            <h1 className='no-order-text'>No Orders Available</h1>
                <img src={assets.order} />
            </div>
        ))
      }
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Orders;
