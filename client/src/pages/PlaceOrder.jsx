import React, { useContext, useEffect, useState } from 'react';
import '../styles/PlaceOrder.css';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoMdArrowRoundBack } from "react-icons/io";
import Footer from '../components/Footer';


const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { cartItems, user, getCartAmount,setCartItems } = useContext(UserContext);
  const navigate = useNavigate();


  useEffect(()=>{
    if(!user || !user.uid) {
      navigate('/');
    }
  },[user])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const [userId, setUserId] = useState(null); 
  
  useEffect(() => {
    if (user && user.uid) {
      setUserId(user.uid);
    }
  }, [user]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isFormValid = Object.values(formData).every((field) => field.trim() !== '');

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error('Please log in to place an order.');
      return;
    }

    if(!isFormValid) {
      toast.error('Please Fill all the details in the Form.');
      return
    }

    const orderDetails = {
      userId: userId,
      deliveryInfo: formData,
      cartItems,
      totalAmount: getCartAmount(),
      paymentMethod: method,
    };

    try {
      if (method === 'cod') {
        const response = await axios.post('http://localhost:8086/api/orders/create', orderDetails);
        if (response.data.success) {
          toast.success('Order placed successfully with Cash on Delivery.');
          setCartItems({})
          localStorage.setItem('cartItems', JSON.stringify({}));
          navigate('/orders');
        } else {
          throw new Error('Failed to place the order.');
        }
      } else if (method === 'stripe') {
        const response = await axios.post('http://localhost:8086/api/orders/create', orderDetails);
        if (response.data.success) {
          setCartItems({})
          localStorage.setItem('cartItems', JSON.stringify({}));
          window.location.href = response.data.stripeCheckoutUrl;
        } else {
          throw new Error('Stripe payment initialization failed.');
        }
      }
    } catch (error) {
      toast.error(`Order placement failed: ${error.message}`);
    }
  };

  const handleBack = ()=> {
    navigate('/cart')
  }

  return (
    <>
    <div className='placeOrder-back'>
    <div className='placeOrder-back-icon'> <IoMdArrowRoundBack /> </div>
        <h1 className='placeOrder-back-text' onClick={handleBack}>Back</h1>
    </div>
    <div className='placeorder'>
      <div className='placeorder-left'>
        <div style={{ margin: '2rem 0' }}>
          <h1>DELIVERY INFORMATION</h1>
        </div>
        <div className='placeorder-info-form-pair'>
          <input
            className='placeorder-info-form-input'
            type='text'
            name='firstName'
            placeholder='First name'
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            className='placeorder-info-form-input'
            type='text'
            name='lastName'
            placeholder='Last name'
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          className='placeorder-info-form-input'
          type='text'
          name='email'
          placeholder='Email address'
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          className='placeorder-info-form-input'
          type='text'
          name='street'
          placeholder='Street'
          value={formData.street}
          onChange={handleInputChange}
          required
        />
        <div className='placeorder-info-form-pair'>
          <input
            className='placeorder-info-form-input'
            type='text'
            name='city'
            placeholder='City'
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <input
            className='placeorder-info-form-input'
            type='text'
            name='state'
            placeholder='State'
            value={formData.state}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='placeorder-info-form-pair'>
          <input
            className='placeorder-info-form-input'
            type='number'
            name='zipCode'
            placeholder='Zipcode'
            value={formData.zipCode}
            onChange={handleInputChange}
            required
          />
          <input
            className='placeorder-info-form-input'
            type='text'
            name='country'
            placeholder='Country'
            value={formData.country}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          className='placeorder-info-form-input'
          type='number'
          name='phone'
          placeholder='Phone'
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className='placeorder-right'>
        <div className='placeorder-amount'>
          <CartTotal />
        </div>

        <div className='placeorder-payment-main'>
          <h1>PAYMENT METHOD</h1>
          <div className='placorder-payment-method-list'>
            <div onClick={() => setMethod('stripe')} className='placeorder-payment-method'>
              <p className={`placeorder-payment-method-ptag ${method === 'stripe' ? 'placeorder-method-active' : ''} `}></p>
              <img className='placeorder-payment-image' src={assets.stripe} alt='' />
            </div>
            <div onClick={() => setMethod('cod')} className='placeorder-payment-method'>
              <p className={`placeorder-payment-method-ptag ${method === 'cod' ? 'placeorder-method-active' : ''} `}></p>
              <p className='placeorder-payment-cod'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="placeorder-payment-container">
            <button
              onClick={handlePlaceOrder}
              className="placeorder-payment-button"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PlaceOrder;
