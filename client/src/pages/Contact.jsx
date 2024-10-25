import React, { useState } from 'react';
import '../styles/Contact.css';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import axios from 'axios'
import { toast } from 'react-toastify'

const ContactPage = () => {
  const [activeForm, setActiveForm] = useState('user');

  const handleFormSwitch = (formType) => {
    setActiveForm(formType);
  };

  const [image, setImage] = useState(false);
    const [bannerImage1, setBannerImage1] = useState(false);
    const [bannerImage2, setBannerImage2] = useState(false);

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [year, setYear] = useState("");
    const [color, setColor] = useState("");
    const [location, setLocation] = useState("");
    const [stack, setStack] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [ownerPhone, setOwnerPhone] = useState("");
    const [ownerEmail, setOwnerEmail] = useState("");
    const [certificates, setCertificates] = useState([]);

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const formData = new FormData();
          formData.append("name", name);
          formData.append("desc", desc);
          formData.append("type", type);
          formData.append("breed", breed);
          formData.append("age", age);
          formData.append("gender", gender);
          formData.append("year", year);
          formData.append("color", color);
          formData.append("location", location);
          formData.append("stack", stack);
          formData.append("ownerName", ownerName);
          formData.append("ownerphone", ownerPhone);
          formData.append("owneremail", ownerEmail);
          image && formData.append("image", image);
          bannerImage1 && formData.append("bannerImages", bannerImage1);
          bannerImage2 && formData.append("bannerImages", bannerImage2);

          if (certificates.length > 0) {
            for (let i = 0; i < certificates.length; i++) {
                formData.append("certificates", certificates[i]);
            }
        }
  
          const response = await axios.post("http://localhost:8086/api/animal", formData);
  
          if (response.data.success) {
              toast.success(response.data.message);
              setName("");
              setDesc("");
              setType("");
              setBreed("");
              setAge("");
              setGender("");
              setYear("");
              setColor("");
              setLocation("");
              setStack("");
              setOwnerName("");
              setOwnerPhone("");
              setOwnerEmail("");
              setImage(false);
              setBannerImage1(false);
              setBannerImage2(false);
              setCertificates([]);
          } else {
              toast.error(response.data.message);
          }
      } catch (error) {
          console.log(error);
          toast.error(error.message);
      }
  }

  const handleCertificatesChange = (e) => {
    setCertificates(e.target.files); // Set multiple files for certificates
}

  return (
    <>
      <Navbar />
      <section
        className="dog-banner-image"
        style={{ backgroundImage: `url(${assets.contact})` }}
      >
        <h1 className="dog-banner-title">CONTACT CAS</h1>
        <p className="dog-banner-desc">
          They come in all shapes and sizes, with different histories, characters, and disabilities.
          But they have one thing in common: they are all in need of a helping hand.
        </p>
        <div className="overlay"></div>
      </section>

      <section className='contact-content' >
        <div className='title-main' style={{ fontSize: '2.75rem', alignItems: `center`, justifyContent: 'start' }}>
        <hr className='title-line' />
          <p className='title-p'>Contact<span className='title-span'>US</span></p>
          <hr className='title-line' />
        </div>
        <div className='contact-items'>
          <div className='contact-items-icon'>
            <FaLocationDot />
          </div>

          <div className='contact-items-text1'>
            Office 1013 Cargo Mega Terminal Cargo Village Dubai Main Road, Dubai Airport Dubai - United Arab Emirates
          </div>
        </div>
        <div className='contact-items'>
          <div className='contact-items-icon'>
            <FaPhone />
          </div>

          <div className='contact-items-text2'>
            +971-45490495
          </div>
        </div>
        <div className='contact-items'>
          <div className='contact-items-icon'>
            <MdEmail />
          </div>

          <div className='contact-items-text3'>
            CAS@carrymypet.ae
          </div>
        </div>
      </section>

      <hr />

      <section className="location-section">
      <div className='title-main2' style={{ fontSize: '2.75rem', alignItems: `center`, justifyContent: 'start' }}>
        <hr className='title-line' />
          <p className='title-p'>Our<span className='title-span'>Location</span></p>
          <hr className='title-line' />
        </div>
        <div className="location-icon">
          <i className="fas fa-map-marker-alt"></i>
        </div>
        <div className="location-map">
        <iframe
  title="Kongu Engineering College Location"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.438763459984!2d77.61011631519334!3d11.27581549205067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f6c3f57c8fb%3A0xc0b86a5a4a02f5b3!2sKongu%20Engineering%20College!5e0!3m2!1sen!2sin!4v1636170345173!5m2!1sen!2sin"
  width="100%"
  height="400"
  allowfullscreen=""
  loading="lazy"
></iframe>

        </div>
      </section>

      <hr />

      <section className="contact-form-section">
      <div className='title-main2' style={{ fontSize: '2.75rem', alignItems: `center`, justifyContent: 'start' }}>
        <hr className='title-line' />
          <p className='title-p'>Contact<span className='title-span'>Form</span></p>
          <hr className='title-line' />
        </div>

        <div className="form-toggle">
          <button
            className={activeForm === 'user' ? 'active' : ''}
            id='contact-button1'
            onClick={() => handleFormSwitch('user')}
          >
            User Form
          </button>
          <button
          id='contact-button2'
            className={activeForm === 'vendor' ? 'active' : ''}
            onClick={() => handleFormSwitch('vendor')}
          >
            Vendor Form
          </button>
        </div>

        {activeForm === 'user' && (
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
        )}

        {activeForm === 'vendor' && (
          <form onSubmit={handleSubmit} className='add-form'>
          <div>
              <p className='add-image-head'>Upload Image</p>
              <div className='add-image-list'>
                  <label htmlFor='image'>
                      <img className='add-image' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt='' />
                      <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
                  </label>
                  <label htmlFor='bannerImage1'>
                      <img className='add-image' src={!bannerImage1 ? assets.upload_area : URL.createObjectURL(bannerImage1)} alt='' />
                      <input onChange={(e) => setBannerImage1(e.target.files[0])} type="file" id='bannerImage1' hidden />
                  </label>
                  <label htmlFor='bannerImage2'>
                      <img className='add-image' src={!bannerImage2 ? assets.upload_area : URL.createObjectURL(bannerImage2)} alt='' />
                      <input onChange={(e) => setBannerImage2(e.target.files[0])} type="file" id='bannerImage2' hidden />
                  </label>
              </div>
          </div>

          <div className='add-input-container'>
              <p>Animal Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='add-name-input' type='text' placeholder='Type here' required />
          </div>

          <div className='add-input-container'>
              <p>Animal Description</p>
              <textarea onChange={(e) => setDesc(e.target.value)} value={desc} className='add-name-input' placeholder='Write Content here' required />
          </div>

          <div className='add-form-content'>
              <div>
                  <p className='add-form-select-head'>Animal Type</p>
                  <input onChange={(e) => setType(e.target.value)} value={type} className='add-name-input' type='text' placeholder='Type here' required />
              </div>

              <div>
                  <p className='add-form-select-head'>Animal Breed</p>
                  <input onChange={(e) => setBreed(e.target.value)} value={breed} className='add-name-input' type='text' placeholder='Type here' required />
              </div>

              <div>
                  <p className='add-form-select-head'>Animal Age</p>
                  <input onChange={(e) => setAge(e.target.value)} value={age} className='add-name-input' type='text' placeholder='Type here' required />
              </div>

              <div>
                  <p className='add-form-select-head'>Animal Gender</p>
                  <input onChange={(e) => setGender(e.target.value)} value={gender} className='add-name-input' type='text' placeholder='Type here' required />
              </div>

              <div>
                  <p className='add-form-select-head'>Year</p>
                  <input onChange={(e) => setYear(e.target.value)} value={year} className='add-name-input' type='text' placeholder='Type here' required />
              </div>

              <div>
                  <p className='add-form-select-head'>Color</p>
                  <input onChange={(e) => setColor(e.target.value)} value={color} className='add-name-input' type='text' placeholder='Type here' required />
              </div>

              <div>
                  <p className='add-form-select-head'>Location</p>
                  <input onChange={(e) => setLocation(e.target.value)} value={location} className='add-name-input' type='text' placeholder='Type here' required />
              </div>

              <div>
                  <p className='add-form-select-head'>Stack</p>
                  <input onChange={(e) => setStack(e.target.value)} value={stack} className='add-name-input' type='text' placeholder='Type here' required />
              </div>

              <div>
                  <p className='add-form-select-head'>Owner Name</p>
                  <input onChange={(e) => setOwnerName(e.target.value)} value={ownerName} className='add-name-input' type='text' placeholder='Type here' required />
              </div>

              <div>
                  <p className='add-form-select-head'>Owner Phone</p>
                  <input onChange={(e) => setOwnerPhone(e.target.value)} value={ownerPhone} className='add-name-input' type='text' placeholder='Type here' required />
              </div>

              <div>
                  <p className='add-form-select-head'>Owner Email</p>
                  <input onChange={(e) => setOwnerEmail(e.target.value)} value={ownerEmail} className='add-name-input' type='email' placeholder='Type here' required />
              </div>
          </div>

          <div className='add-form-content'>
                <div>
                    <p className='add-form-select-head'>Certificates</p>
                    <input onChange={handleCertificatesChange} className='add-name-input' type='file' multiple />
                </div>
            </div>

          <button type='submit' className='form-add-button'>ADD</button>
      </form>
        )}
      </section>
    </>
  );
};

export default ContactPage;
