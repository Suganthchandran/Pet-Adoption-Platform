import React from 'react'
import '../styles/Sidebar.css'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='sidebar-main'>
            <NavLink className='sidebar-elements' to="/addAnimal">
                <img src={assets.add_icon} alt='Add Icon' />
                <p className='sidebar-content-text'>Add Animal</p>
            </NavLink>

            <NavLink className='sidebar-elements' to="/addProduct">
                <img src={assets.order_icon} alt='Add Icon' />
                <p className='sidebar-content-text'>Add Product</p>
            </NavLink>

            <NavLink className='sidebar-elements' to="/listAnimal">
                <img src={assets.add_icon} alt='Add Icon' />
                <p className='sidebar-content-text'>List Animal</p>
            </NavLink>

            <NavLink className='sidebar-elements' to="/listProduct">
                <img src={assets.order_icon} alt='Add Icon' />
                <p className='sidebar-content-text'>List Product</p>
            </NavLink>

            <NavLink className='sidebar-elements' to="/orders">
                <img src={assets.order_icon} alt='Add Icon' />
                <p className='sidebar-content-text'>Orders</p>
            </NavLink>

            <NavLink className='sidebar-elements' to="/users">
                <img src={assets.order_icon} alt='Add Icon' />
                <p className='sidebar-content-text'>Users</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar
