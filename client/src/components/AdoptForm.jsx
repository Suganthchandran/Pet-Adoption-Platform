import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AdoptForm.css';

const AdoptForm = ({ onClose,animalId, animalName, ownername, owneremail, ownerphone }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    message: '',
    animalId,
    animalName,
    ownername,
    owneremail,
    ownerphone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8086/api/adopt/add', formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
      
      if (response.status === 201) {
        alert('Adoption request submitted successfully!');
        onClose();
      } else {
        alert('Error: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='form-overlay'>
      <div className='form-content'>
        <button className='close-button' onClick={onClose}>✖</button>
        <h2>Start Your Adoption Journey</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input 
              type='text' 
              id='name' 
              name='name' 
              placeholder='Enter your name' 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input 
              type='email' 
              id='email' 
              name='email' 
              placeholder='Enter your email' 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className='form-group'>
            <label htmlFor='phone'>Phone Number</label>
            <input 
              type='text' 
              id='phone' 
              name='phone' 
              placeholder='Enter your phone number' 
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className='form-group'>
            <label htmlFor='city'>City</label>
            <input 
              type='text' 
              id='city' 
              name='city' 
              placeholder='Enter your city' 
              value={formData.city} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className='form-group'>
            <label htmlFor='address'>Address</label>
            <input 
              type='text' 
              id='address' 
              name='address' 
              placeholder='Enter your Address' 
              value={formData.address} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className='form-group'>
            <label htmlFor='message'>Message</label>
            <textarea 
              className='adopt-form-textarea' 
              id='message' 
              name='message' 
              placeholder='Message' 
              value={formData.message} 
              onChange={handleChange} 
              required 
            />
          </div>
          <input type='hidden' name='animalName' value={formData.animalName} />
          <input type='hidden' name='ownerName' value={formData.ownername} />
          <input type='hidden' name='ownerEmail' value={formData.owneremail} />
          <input type='hidden' name='ownerPhone' value={formData.ownerphone} />
          <div className='form-button-container'>
            <button type='submit' className='form-button'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptForm;
