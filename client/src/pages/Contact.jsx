import React from 'react';
import '../styles/Contact.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import {assets} from '../assets/assets';

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <section
        className="dog-banner-image"
        style={{ backgroundImage: `url(${assets.Dog_image})` }}
      >
        <h1 className='dog-banner-title'>DOGS AT CAS</h1>
        <p className='dog-banner-desc'>
          They come in all shapes and sizes, with different histories, characters, and disabilities. 
          But they have one thing in common: they are all in need of a helping hand.
        </p>
        <div className="overlay"></div>
      </section>
      <section className="location-section">
        <div className="location-icon">
          <i className="fas fa-map-marker-alt"></i>
        </div>
        <div className="location-map">
        </div>
      </section>
      <section className="contact-form-section">
        <h2>CONTACT FORM</h2>
        <form className="contact-form">
          <div className="form-row">
            <input type="text" placeholder="Name" required />
            <input type="tel" placeholder="Phone no." />
          </div>
          <div className="form-row">
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Reason for contacting us" />
          </div>
          <textarea placeholder="Message" rows="5"></textarea>
          <div className="button-container">
      <button type="submit">SEND MESSAGE</button>
    </div>
         
        </form>
      </section>
    </>
  );
};

export default ContactPage;
