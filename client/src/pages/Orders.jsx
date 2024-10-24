import React, { useContext } from 'react'
import '../styles/Orders.css'
import { UserContext } from '../../context/UserContext';

const Orders = () => {

  const {products,currency} = useContext(UserContext);

  return (
    <div className='order'>
        <div  className='order-start'>
          <h1>MY ORDERS</h1>
        </div>

        <div>
          {
            products.slice(1,4).map((item,index)=>(
                <div key={index} className='order-main'>
                      <div className='order-content'>
                            <img className='order-content-image' src={item.image} alt='' />
                            <div>
                                <p>{item.name}</p>
                                <div style={{marginTop:'0.5rem'}} className='order-info'>
                                    <p style={{fontSize:'1.2rem'}}>{currency} {item.price}</p>
                                    <p>Qunatity: 1</p>
                                    <p>Size: M</p>
                                </div>
                                <p style={{color: 'grey',marginTop:'0.5rem'}}>Date: <span style={{color:'grey',fontWeight:'400'}}>25, Jul, 2024</span></p>
                            </div>
                      </div>
                      <div className='order-shipping'>
                            <div className='order-shipping-content'>
                                <p className='order-shipping-circle'></p>
                                <p>Ready to Ship</p>
                            </div>
                      </div>

                      <div>
                            <button className='order-track'>Track Order</button>
                      </div>
                </div>
            ))
          }
        </div>
    </div>
  )
}

export default Orders
