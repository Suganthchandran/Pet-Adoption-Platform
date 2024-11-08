import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import '../styles/Cart.css'
import CartTotal from '../components/CartTotal'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, user } = useContext(UserContext);
  const [cardData, setCartData] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (!user || !user.uid) {
      console.error('User not logged in');
      return;
    }
    let tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);


  return (
    <>
      <Navbar />
      <section className="home-image" style={{ backgroundImage: `url(${assets.cart})` }}>
        <h1 className='home-title'>CUDDLY ANIMALIA SOCIETY</h1>
        <div className="overlay1"></div>
      </section>
      <div className='cart'>
        <div className='cart-heading'>
          <h1>YOUR CART</h1>
        </div>
        <div>

          {
             (!user || !user.uid) 
             ?
             (

              <div className="empty-cart">
              <h1 className="empty-cart-message">Login to See your Cart!</h1>
              <img src={assets.no_cart} alt="Empty Cart" className="empty-cart-image" />
            </div>
            
             )
             :

             (
              cardData.length > 0 ? (
                cardData.map((item, index) => {
                  const productData = products.find((product) => product._id === item._id);
                  if (!productData) return null;
  
                  return (
                    <div key={index} className="cart-content">
                      <div className="cart-content-inside">
                        <img className="cart-content-image" src={productData.image} alt={productData.name} />
                        <div>
                          <p className="cart-content-name">{productData.name}</p>
                          <div className="cart-content-price-size">
                            <p>{currency} {productData.price}</p>
                            <p className='cart-content-size'>Size: {item.size}</p>
                          </div>
                        </div>
                      </div>
                      <input
                        onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                        className='cart-content-quantity'
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                      />
                      <img onClick={() => updateQuantity(item._id, item.size, 0)} className='cart-content-bin' src={assets.bin_icon} alt="" />
                    </div>
                  );
                })
              ) : (
                <div className="empty-cart">
                  <h1 className="empty-cart-message">Your cart is currently empty. Add items to start shopping!</h1>
                  <img src={assets.no_cart} alt="Empty Cart" className="empty-cart-image" />
                </div>
              )
            
           ) 


            
          }


        </div>

        {
          cardData.length > 0 ? (
            <>
              <div className="cart-amount-container">
                <div className="cart-amount">
                  <CartTotal />
                </div>
              </div>
              <div className="cart-payment-container">
                <button onClick={() => navigate('/place-order')} className="cart-payment-button">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </>
          ) : (
            <div className="empty-cart">

            </div>
          )
        }

      </div>
      <Footer/>
    </>
  )
}

export default Cart
