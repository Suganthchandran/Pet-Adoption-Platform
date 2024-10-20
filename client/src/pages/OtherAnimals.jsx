import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import AnimalCards from '../components/AnimalCards';
import '../styles/OtherAnimals.css';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import Footer from '../components/Footer';

const OtherAnimals = () => {
    const location = useLocation();
    const { name } = location.state || { name: 'other_animals' };
    const { animals } = useContext(UserContext);

    const [filters, setFilters] = useState({
        breed: '',
        age: '',
        gender: '',
        color: '',
        year: ''
    });

    const [filteredAnimals, setFilteredAnimals] = useState([]);

    const Other_animals = animals.filter(animal => animal.type !== 'dog' && animal.type !== 'cat'); // Filter only Other_animals
    const uniqueAnimals = [...new Set(Other_animals.map(animal => animal.type))];
    const uniqueAges = [...new Set(Other_animals.map(animal => animal.age))];
    const uniqueGenders = [...new Set(Other_animals.map(animal => animal.gender))];
    const uniqueColors = [...new Set(Other_animals.map(animal => animal.color))];
    const uniqueYears = [...new Set(Other_animals.map(animal => animal.year))];

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    useEffect(() => {
        let filtered = Other_animals.filter(animal => {
            return (
                (!filters.type || animal.type === filters.type) &&
                (!filters.age || animal.age === filters.age) &&
                (!filters.gender || animal.gender === filters.gender) &&
                (!filters.color || animal.color === filters.color) &&
                (!filters.year || animal.year === filters.year)
            );
        });
        setFilteredAnimals(filtered);
    }, [filters, Other_animals]);

    return (
        <>
        <Navbar/>
            <section className="other_animals-banner-image" style={{ backgroundImage: `url(${assets.Animal_Banner_image})` }}>
                <h1 className='other_animals-banner-title'>Other Animals AT CAS</h1>
                <p className='other_animals-banner-desc'>They come in all shapes and sizes, with different histories, characters and disabilities. But they have one thing in common: they are all in need of a helping hand</p>
                <div className="overlay"></div>
            </section>
        <div className="other_animals">

            <div className="other_animals-filter-options">
                <h1 className='other_animals-filter-head'>FILTERS</h1>
                <div className="other_animals-filter-dropdown">
                    <label>ANIMALS:</label>
                    <select name="type" onChange={handleFilterChange}>
                        <option value="">All</option>
                        {uniqueAnimals.map((subtype, index) => (
                            <option key={index} value={subtype}>{subtype}</option>
                        ))}
                    </select>
                </div>

                <div className="other_animals-filter-dropdown">
                    <label>Age:</label>
                    <select name="age" onChange={handleFilterChange}>
                        <option value="">All</option>
                        {uniqueAges.map((age, index) => (
                            <option key={index} value={age}>{age}</option>
                        ))}
                    </select>
                </div>

                <div className="other_animals-filter-dropdown">
                    <label>Gender:</label>
                    <select name="gender" onChange={handleFilterChange}>
                        <option value="">All</option>
                        {uniqueGenders.map((gender, index) => (
                            <option key={index} value={gender}>{gender}</option>
                        ))}
                    </select>
                </div>

                <div className="other_animals-filter-dropdown">
                    <label>Color:</label>
                    <select name="color" onChange={handleFilterChange}>
                        <option value="">All</option>
                        {uniqueColors.map((color, index) => (
                            <option key={index} value={color}>{color}</option>
                        ))}
                    </select>
                </div>

                <div className="other_animals-filter-dropdown">
                    <label>Year:</label>
                    <select name="year" onChange={handleFilterChange}>
                        <option value="">All</option>
                        {uniqueYears.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Displaying the filtered other_animalss */}
            <div className="other_animals-right">
                <h1>OTHER ANIMALS : </h1>
                <div className="other_animals-products">
                    {filteredAnimals.length > 0 ? (
                        filteredAnimals.map((animal, index) => (
                            <AnimalCards
                                key={index}
                                name={animal.name}
                                id={animal.id}
                                year={animal.year}
                                image={animal.image}
                            />
                        ))
                    ) : (
                        <p>No Other Animals found for the selected filters.</p>
                    )}
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default OtherAnimals; // Updated export statement
