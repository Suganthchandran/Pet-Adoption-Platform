import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import '../styles/Home.css';
import Navbar from '../components/Navbar';
import { Tilt } from 'react-tilt';
import Features from '../components/Features';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
};

const hoverEffect = {
    scale: 1.05,
    transition: { duration: 0.3 },
};

const Home = () => {

    const navigate = useNavigate();

    const handleNavigation = (path, name) => {
        navigate(path, { state: { name } });
    };

    return (
        <div className='home'>
            <Navbar/>
            <section className="home-image" style={{ backgroundImage: `url(${assets.Home_image})` }}>
                <h1 className='home-title'>CUDDLY ANIMALIA SOCIETY</h1>
                <div className="overlay1"></div>
            </section>

            <motion.div
                className='home-content'
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className='home-types-container'>
                    <Tilt>
                        <motion.div
                            className='home-type home-type1'
                            onClick={()=>handleNavigation('/dogs','dog')}
                            variants={itemVariants}
                            whileHover={hoverEffect}
                        >
                            <img className='home-type-image1' src={assets.Home_dog} />
                            <h1>DOG</h1>
                        </motion.div>
                    </Tilt>

                    <Tilt>
                        <motion.div
                            className='home-type home-type2'
                            onClick={()=>handleNavigation('/cats','cat')}
                            variants={itemVariants}
                            whileHover={hoverEffect}
                        >
                            <img className='home-type-image2' src={assets.Home_cat} />
                            <h1>CAT</h1>
                        </motion.div>
                    </Tilt>

                    <Tilt>
                        <motion.div
                            className='home-type home-type3'
                            onClick={()=>handleNavigation('/other-animals','other_animals')}
                            variants={itemVariants}
                            whileHover={hoverEffect}
                        >
                            <img className='home-type-image3' src={assets.Home_animals} />
                            <h1>OTHER ANIMALS</h1>
                        </motion.div>
                    </Tilt>
                </motion.div>
            </motion.div>

            <div className='home-desc'>
                <div className='home-desc-title'>
                    Welcome to the Cuddly Animal Society !
                </div>
                <div className='home-desc-content'>
                        <div>
                        Cuddly Animal Society (CAS) was established in April 2006 as a non-profit trust under the Indian Trust Act to address the welfare of stray animals in the city of Coimbatore, Tamil Nadu, India. This we do through animal birth control and anti-rabies drives, and by rescuing animals that are in urgent need of treatment. The rescued animals are treated and rehabilitated at our ABC and Rescue Centre before being released back to their community. 
                        </div>
                        <div>
                        The CAS Sanctuary becomes the new home of the ones for whom release wouldn't be safe. CAS is also engaged in creating awareness, and advocates for the equal rights of all sentient beings. CAS does receive a small amount of public funding, but is reliant on the contribution of generous individuals. 
                        </div>
                        <div>
                        By volunteering and donating, and by adopting, fostering or sponsoring individual animals, you not only have a direct and measurable impact on the well-being of stray animals in Coimbatore, but also on the almost 300 cats and dogs, plus two cows and a horse, that live at the Sanctuary or are being treated at the ABC and Rescue Centre. So, please come in to explore further. We welcome you to open your hearts and join our cause.
                        </div>
                </div>
            </div>

            <div>
                <Features/>
            </div>

            <div className='home-last'>
                <div className='home-last-container1'>
                    <div>
                        <div>
                            <img className='home-last1-image1' src={assets.Dog_image} />
                        </div>
                        <img className='home-last1-image2' src={assets.Dog_image} />
                    </div>
                    <div className='home-last1-text'>
                        <h1>Read More</h1>
                    </div>
                </div>

                <div className='home-last-container2'>
                    <div>
                        <div>
                            <img className='home-last2-image1' src={assets.Cat_image} />
                        </div>
                        <img className='home-last2-image2' src={assets.Cat_image} />
                    </div>
                    <div className='home-last2-text'>
                        <h1>Read More</h1>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Home;
