import React from 'react'
import '../styles/Navbar.css'

const Navbar = ({setToken}) => {
  return (
    <div className='navbar'>
      <h1 className='navbar-logo'>Diago Admin Panel</h1>
      <button onClick={()=>setToken("")} className='navbar-button'>Logout</button>
    </div>
  )
}

export default Navbar
