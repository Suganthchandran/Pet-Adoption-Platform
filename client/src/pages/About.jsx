import React from 'react'
import '../styles/About.css'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import Footer from '../components/Footer'

const About = () => {
  return (
    <>
    <div>
      <Navbar/>
            <section className="about-image" style={{ backgroundImage: `url(${assets.about})` }}>
                <h1 className='about-title'>ABOUT CAS</h1>
                <div className="overlay1"></div>
            </section>
    </div>
    <div className="about-container">

      <div className='about-text1'>
      " Animals are simply magical creatures and they can teach us more than we can ever teach them. No wonder there are so many wonderful animal quotes out there! "
      </div>

      <section className="mission-statement">
        <p className='about-text2'>
          Cuddly Animalia Society (CAS) was started in 2006 to address animal welfare in the city of Coimbatore, and to carry out the critical function of Animal Birth Control (ABC). HAS is a public non-profit organisation registered with the Government of Tamil Nadu as a trust under certificate no. 998/2006 under section 12A (a) of the IT act 1961. Consequently, all financial contributions are tax-exempt under section 80(g).

          CAS is a group of people who believe that the power of compassion, love, and kindness will make a meaningful and positive difference to the lives of the animals around us. We strive to rescue, treat, rehabilitate, feed, and love the animals that need us the most.
          The mission statement of CAS is to mitigate animal suffering through humane ABC, rescue, treatment & rehabilitation.
          To spread awareness about animal rights through education in schools. To empower humans by providing them with a platform
          to contribute to the cause in their own unique way. Our vision is of a compassionate society where exploitation and abuse of animals is a thing of the past, and a future where all animals can claim their place on this Earth.
        </p>
      </section>

      <div className="banner">
        <img src={assets.about_1} />
      </div>

      <section className="our-mission">
        <img src={assets.about_2} alt="Our Mission" className="mission-image" />
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            The Adoption Mission is a program by Mars Petcare that aims to end pet homelessness globally by 2030. The Adoption Mission
            works with animal shelters to help address challenges around pet adoption and abandonment. The program offers support to shelters,
            including: Guidance from behaviorists, Staff training, and Toolkits.
          </p>
          <p>
            Together, we can make a difference—one wagging tail, one purring kitten, one loving home at a time.
          </p>
        </div>
      </section>

      <section className="our-story">
        <div className="story-content">
          <h2>Our Story</h2>
          <p>
            At CAS, we believe that every pet deserves a loving home, and every family can be enriched by the unconditional love of a companion animal.
            Our journey began with a simple mission: to give vulnerable animals a second chance at life, and to match them with caring people who are ready
            to open their hearts and homes.
          </p>
          <p>
            It all started when our founder, [name], rescued a stray dog named [Dog's Name]. Left alone and scared, [Dog's Name] transformed into a playful,
            loyal companion after finding the love and care he needed. This experience opened our eyes to the thousands of animals waiting in shelters, on the streets,
            or in unsafe situations, longing for the same chance. We knew we had to do something.
          </p>
        </div>
        <img src={assets.about_3} alt="Our Story" className="story-image" />
      </section>

      <p className="thank-you">Thanks for visiting our page.</p>
    </div>
    <Footer/>
    </>
  )
}

export default About
