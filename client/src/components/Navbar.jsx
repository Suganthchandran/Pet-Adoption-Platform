import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { UserContext } from '../../context/UserContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { userDetails, handleLogout } = useContext(UserContext);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo">CAS</div>
      <nav className="navbar-content">
        <ul>
          <li><a href="/">HOME</a></li>
          <li><a href="/shop">SHOP</a></li>
          <li><a href="/about">ABOUT US</a></li>
          <li><a href="/contact">CONTACT</a></li>
          {
            userDetails ? 
            <>
              <li onClick={toggleDropdown} style={{cursor:'pointer'}} className="navbar-user">
                {userDetails.name.toUpperCase()}
                {dropdownVisible && (
                  <ul className="navbar-dropdown">
                    <li><Link to="/cart">CART</Link></li>
                    <li><Link to="/orders">ORDERS</Link></li>
                    <li className='navbar-logout' onClick={handleLogout}>LOGOUT</li>
                  </ul>
                )}
              </li>
            </>
            :
            <li><Link to='/login'>LOGIN</Link></li>
          }
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
