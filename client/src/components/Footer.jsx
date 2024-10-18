import React from 'react';
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-heading">
          <p>Your pet, Our Patrons</p>
        </div>
      </div>
      
      <div className="footer-main">
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Why Choose Us</li>
            <li>Pricing</li>
            <li>Testimonial</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Resources</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
            <li>Blog</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Product</h4>
          <ul>
            <li>Project Management</li>
            <li>Time Tracker</li>
            <li>Time Schedule</li>
            <li>Lead Generate</li>
            <li>Remote Collaboration</li>
          </ul>
        </div>

        <div className="footer-column footer-subscribe">
          <h2>CAS</h2>
          <p>To get the latest on pet adoption and pet care, sign up for the Petfinder newsletter.</p>
          <form className="subscribe-form">
            <input type="email" placeholder="Enter your Email" />
            <button type="submit">Sign in</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© Copyright 2024 Velan Info Services India Pvt Ltd.</p>
        <div className="footer-socials">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-linkedin"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
