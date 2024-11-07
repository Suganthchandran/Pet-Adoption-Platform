import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets'
import '../styles/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8086/api/orders');
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
        console.log('Order List: ', response.data.orders);
        fetchProductDetails(response.data.orders);
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
  }, []);

  useEffect(() => {
    console.log('Product Details:', productDetails);
  }, [productDetails]);

  if (loading) {
    return <div>Loading...</div>;
  }


  const statusHandler = async (e, orderId)=> {
    try {
      const response = await axios.post('http://localhost:8086/api/orders/status',{orderId, orderStatus: e.target.value});
      if(response.data.success) {
        await fetchOrders();
      }
      else {
        toast.error(response.data.message);
      }
    }
    catch(error) {
      toast.error(error.message);
    }
  }

  return (
    <div className='order'>
      <div className='order-start'>
        <h1>Orders Page</h1>
      </div>

      <div>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className='order-main'>


              <div> <img src={assets.parcel_icon} /> </div>


              <div className='order-items'>


                <div>
                  {order.cartItems.map((item, index) => {
                    const product = productDetails[item.productId] || {};

                    const weights = item.weights || {};

                    return (
                      <div key={index}>
                        {product.name ? (
                          <div className='order-item'>
                            <div className='order-contents'>
                              <div>
                                {Object.keys(weights).map((weightKey, weightIndex) => {
                                  const weightQuantity = weights[weightKey];
                                  return (

                                    <div style={{ display: 'flex', flexDirection: 'column', color: 'grey' }} key={weightIndex}>
                                      <div><p style={{ fontSize: '1rem', fontWeight: '700' }}>{product.name} - {weightKey} x {weightQuantity}</p></div>
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


                <div>
                  <p className='order-content-name'>{order.deliveryInfo.firstName + " " + order.deliveryInfo.lastName}</p>
                  <div>
                    <p>{order.deliveryInfo.street + ","}</p>
                    <p>{order.deliveryInfo.city + ", " + order.deliveryInfo.state + ", " + order.deliveryInfo.country + ", " + order.deliveryInfo.zipCode}</p>
                  </div>
                  <p>{order.deliveryInfo.phone}</p>

                </div>


              </div>



              <div style={{marginLeft:'1rem'}}>
                <div className='orders-head'>
                  <div className='order-details'>
                    <div className='order-mini-content'>
                      <div>Method: {order.paymentMethod}</div>
                      <div>Payment Status: {order.paymentStatus === 'paid' ? 'Done' : 'Pending'}</div>
                      <div>Date: {new Date(order.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>


                </div>


              </div>



              <div>

                <div>Price: $ {order.totalAmount}</div>

              </div>


                  <div>
                  <select onChange={(e)=>statusHandler(e,order._id)} value={order.orderStatus} className='order-content-select'>
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>


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
