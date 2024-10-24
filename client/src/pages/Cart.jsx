import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import '../styles/Cart.css'
import CartTotal from '../components/CartTotal'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity } = useContext(UserContext);
  const [cardData, setCartData] = useState([]); 
  console.log(cartItems);
  const navigate = useNavigate();

  useEffect(() => {
    let tempData = [];

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }

    setCartData(tempData)
  }, [cartItems])

  return (
    <div className='cart'>
      <div className='cart-heading'>
        <h1>YOUR CART</h1>
      </div>
      <div>
      {
  cardData.map((item, index) => {
    const productData = products.find((product) => product._id === item._id);
    console.log("Inside Cart ",productData);
    if (!productData) return null;

    return (
      <div key={index} className="cart-content">
        <div className="cart-content-inside">
          <img className="cart-content-image" src={productData.image} alt={productData.name} />
          <div>
            <p className="cart-content-name">{productData.name}</p>
            <div className="cart-content-price-size">
              <p>{currency} {productData.price}</p>
              <p className='cart-content-size'>Size: {item.size}</p> {/* Display selected size */}
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
}

      </div>

      <div className="cart-amount-container">
        <div className="cart-amount">
          <CartTotal />
        </div>
      </div>
      <div className="cart-payment-container">
        <button onClick={()=>navigate('/place-order')} className="cart-payment-button">PROCEED TO CHECKOUT</button>
      </div>

    </div>
  )
}

export default Cart
