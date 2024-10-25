import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import AnimalCards from '../components/AnimalCards';
import '../styles/Dogs.css';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import Footer from '../components/Footer';

const Dogs = () => {
    const location = useLocation();
    const { name } = location.state || { name: 'Dog' };
    const { animals } = useContext(UserContext);

    const [filters, setFilters] = useState({
        breed: '',
        age: '',
        gender: '',
        color: '',
        year: ''
    });

    const dogs = animals?.filter(animal => animal.type === 'dog') || [];
    const uniqueBreeds = [...new Set(dogs.map(animal => animal.breed))];
    const uniqueAges = [...new Set(dogs.map(animal => animal.age))];
    const uniqueGenders = [...new Set(dogs.map(animal => animal.gender))];
    const uniqueColors = [...new Set(dogs.map(animal => animal.color))];
    const uniqueYears = [...new Set(dogs.map(animal => animal.year))];

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    const filteredAnimals = useMemo(() => {
        return dogs.filter(animal => {
            return (
                (!filters.breed || animal.breed === filters.breed) &&
                (!filters.age || animal.age === filters.age) &&
                (!filters.gender || animal.gender === filters.gender) &&
                (!filters.color || animal.color === filters.color) &&
                (!filters.year || animal.year === filters.year)
            );
        });
    }, [filters, dogs]);

    return (
        <>
        <Navbar />
            <section className="dog-banner-image" style={{ backgroundImage: `url(${assets.Dog_image})` }}>
                <h1 className='dog-banner-title'>DOGS AT CAS</h1>
                <p className='dog-banner-desc'>They come in all shapes and sizes, with different histories, characters and disabilities. But they have one thing in common: they are all in need of a helping hand</p>
                <div className="overlay"></div>
            </section>
        <div className="dog">

            <div className="dog-filter-options">
                <h1 className='dog-filter-head'>FILTERS</h1>
                <div className="dog-filter-dropdown">
                    <label>Breed:</label>
                    <select name="breed" onChange={handleFilterChange}>
                        <option value="">All</option>
                        {uniqueBreeds.map((breed, index) => (
                            <option key={index} value={breed}>{breed}</option>
                        ))}
                    </select>
                </div>

                <div className="dog-filter-dropdown">
                    <label>Age:</label>
                    <select name="age" onChange={handleFilterChange}>
                        <option value="">All</option>
                        {uniqueAges.map((age, index) => (
                            <option key={index} value={age}>{age}</option>
                        ))}
                    </select>
                </div>

                <div className="dog-filter-dropdown">
                    <label>Gender:</label>
                    <select name="gender" onChange={handleFilterChange}>
                        <option value="">All</option>
                        {uniqueGenders.map((gender, index) => (
                            <option key={index} value={gender}>{gender}</option>
                        ))}
                    </select>
                </div>

                <div className="dog-filter-dropdown">
                    <label>Color:</label>
                    <select name="color" onChange={handleFilterChange}>
                        <option value="">All</option>
                        {uniqueColors.map((color, index) => (
                            <option key={index} value={color}>{color}</option>
                        ))}
                    </select>
                </div>

                <div className="dog-filter-dropdown">
                    <label>Year:</label>
                    <select name="year" onChange={handleFilterChange}>
                        <option value="">All</option>
                        {uniqueYears.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="dog-right">
                <h1>DOGS:</h1>
                <div className="dog-products">
                    {filteredAnimals.length > 0 ? (
                        filteredAnimals.map((animal, index) => (
                            <AnimalCards
                                key={index}
                                name={animal.name}
                                id={animal._id}
                                year={animal.year}
                                image={animal.image}
                            />
                        ))
                    ) : (
                        <div>
                        <p className='dogs-no-search-para'>No dogs found for the selected filters.</p>
                        <div className='dogs-no-search-logo'>
                            <img src={assets.no_Dog} alt='' />
                        </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default Dogs;
