import React from 'react';
import '../styles/Certificate.css';
import { assets } from '../assets/assets';

const Certificate = ({ certificate, onClose }) => {
  return (
    <div className='form-overlay'>
      <div className='form-content'>
        <button className='close-button' onClick={onClose}>✖</button>
        <h2>Related Certificates</h2>
        <hr/>
       {certificate[0] ? (
        <div className="certificate-card">
          <div className="pdf-placeholder">
            <img className='pdf-image' src={assets.pdf} />
          </div>
          <a href={certificate[0]} download className="certificate-download-button">
            Download Certificate
          </a>
        </div>
      ) : (
        <div>
          <img className='certificate-not-found' src={assets.noCertificate} />
            <p className='certificate-not-title'>No certificate available.</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default Certificate;
