import React, { useContext } from 'react'
import '../styles/CartTotal.css'
import { UserContext } from '../../context/UserContext';

const CartTotal = () => {

    const {currency, delivery_fee, getCartAmount} = useContext(UserContext);

  return (
    <div className='carttotal'>
        <div>
            <h1>CART TOTAL</h1>
        </div>

        <div className='carttotal-main'>
                <div className='carttotal-amount'>
                    <p>Subtotal</p>
                    <p>{currency} {getCartAmount()}.00</p>
                </div>

                <hr />
                
                <div className='carttotal-amount'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee}.00</p>
                </div>

                <hr/>

                <div className='carttotal-amount' style={{fontWeight:'700'}}>
                    <p>Total</p>
                    <p>{currency} {getCartAmount() == 0 ? 0 : getCartAmount()+delivery_fee}.00</p>
                </div>
        </div>
    </div>
  )
}

export default CartTotal
