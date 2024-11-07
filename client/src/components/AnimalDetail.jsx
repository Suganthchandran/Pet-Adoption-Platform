import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/AnimalDetail.css';
import Navbar from './Navbar';
// import { assets } from '../assets/assets';
import AdoptForm from './AdoptForm';
import Certificate from './Certificate';

const AnimalDetail = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isModalOpen1, setModalOpen1] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);

  const handleButtonClick1 = () => {
    setModalOpen1(true); 
  };

  const closeModal1 = () => {
    setModalOpen1(false);
  };

  const handleCertificateClick = () => {
    setModalOpen2(true);
  };

  const closeModal2 = () => {
    setModalOpen2(false);
  };

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8086/api/animal/${id}`);
        setAnimal(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching animal details:', error);
        setLoading(false);
      }
    };

    fetchAnimalDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!animal) {
    return <p>Animal not found</p>;
  }

  return (
    <>
      <Navbar />
      <section
        className="dog-banner-image"
        style={{ backgroundImage: `url(${ animal.image })` }}
      >
        <h1 className='dog-banner-title'>{animal.name.toUpperCase()} AT CAS</h1>
        <p className='dog-banner-desc'>
          They come in all shapes and sizes, with different histories, characters, and disabilities.
          But they have one thing in common: they are all in need of a helping hand.
        </p>
        <div className="overlay"></div>
      </section>

      <section className="animal-info">
        <div className="info-grid">
          <div><strong>BIRTH</strong><p>{animal.year}</p></div>
          <div><strong>GENDER</strong><p>{animal.gender}</p></div>
          <div><strong>SIZE</strong><p>{animal.age}</p></div>
          <div><strong>LOCATION</strong><p>{animal.location}</p></div>
        </div>

        <div className="second-row">
          <div><strong>COLOR</strong><p>{animal.color}</p></div>
          <div><strong>BREED</strong><p>{animal.breed}</p></div>
        </div>

      </section>

      <section className="animal-gallery">
        <img src={animal.bannerImages[0]} alt="Max 1" />
        <img src={animal.bannerImages[1]} alt="Max 2" />
      </section>

      <section className="adopt-certificate">
        <div className="adopt-section">
          <h3>Adopt Me</h3>
          <p>
          Are you looking to add a loving companion to your family? Adopting a pet can bring endless joy, comfort, and companionship to your life. Every animal on our platform is in need of a warm, safe, and caring home. When you adopt, you’re not just welcoming a pet—you’re also saving a life and helping us open up space to rescue another.
          </p>
          <button className="adopt-button" onClick={handleButtonClick1}>Adopt</button>
        </div>
        <div className="certificate-section">
          <h3>Certificate</h3>
          <p>
          We take every step to ensure our pets are healthy, vaccinated, and ready to join your family. Each pet on our platform has undergone a complete medical evaluation, up-to-date vaccinations, and the necessary certifications for a safe adoption. This process is our commitment to their well-being and your peace of mind.
           </p>
          <button className="certificate-button" onClick={handleCertificateClick}>Get Certificate</button>
        </div>
      {isModalOpen1 && 
       <AdoptForm
       onClose={closeModal1}
       animalName={animal.name}
       ownername={animal.ownerName}
       owneremail={animal.owneremail}
       ownerphone={animal.ownerphone}
     />
     }
      {isModalOpen2 && <Certificate certificate={animal.certificates} onClose={closeModal2} />} 

      </section>
      <section className="about-animal">
        <h2>About {animal.name}</h2>
        <p>
          {animal.desc}
        </p>
      </section>
    </>
  );
};

export default AnimalDetail;
