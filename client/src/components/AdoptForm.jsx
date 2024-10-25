import React from 'react';
import '../styles/AdoptForm.css'; // Import styles for the form

const AdoptForm = ({ onClose }) => {
  return (
    <div className='form-overlay'>
      <div className='form-content'>
        <button className='close-button' onClick={onClose}>✖</button> {/* Close icon */}
        <h2>Start Your Adoption Journey</h2>
        <hr/>
        <form>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' placeholder='Enter your name' required />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' placeholder='Enter your email' required />
          </div>
          <div className='form-group'>
            <label htmlFor='phone'>Phone Number</label>
            <input type='text' id='phone' name='phone' placeholder='Enter your phone number' required />
          </div>
          <div className='form-group'>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' name='city' placeholder='Enter your city' required />
          </div>
          <div className='form-group'>
            <label htmlFor='Address'>Address</label>
            <input type='text' id='Address' name='Address' placeholder='Enter your Address' required />
          </div>
          <div className='form-group'>
            <label htmlFor='messsage'>Message</label>
            <textarea className='adopt-form-textarea' id='messsage' name='messsage' placeholder='Message' required />
          </div>
          <div className='form-button-container'>
          <button type='submit' className='form-button'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptForm;
