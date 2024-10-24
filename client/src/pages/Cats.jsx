import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import AnimalCards from '../components/AnimalCards';
import '../styles/Cats.css';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import Footer from '../components/Footer';

const Cats = () => {
    const location = useLocation();
    const { name } = location.state || { name: 'Cat' };
    const { animals } = useContext(UserContext);

    const [filters, setFilters] = useState({
        breed: '',
        age: '',
        gender: '',
        color: '',
        year: ''
    });

    // Extract unique filter values (only from cats)
    const cats = animals?.filter(animal => animal.type === 'cat') || []; // Make sure the type is 'Cat'
    const uniqueBreeds = [...new Set(cats.map(animal => animal.breed))];
    const uniqueAges = [...new Set(cats.map(animal => animal.age))];
    const uniqueGenders = [...new Set(cats.map(animal => animal.gender))];
    const uniqueColors = [...new Set(cats.map(animal => animal.color))];
    const uniqueYears = [...new Set(cats.map(animal => animal.year))];

    // Update filters based on dropdown selection
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    // Filter the cats based on selected filters
    const filteredAnimals = useMemo(() => {
        return cats.filter(animal => {
            return (
                (!filters.breed || animal.breed === filters.breed) &&
                (!filters.age || animal.age === filters.age) &&
                (!filters.gender || animal.gender === filters.gender) &&
                (!filters.color || animal.color === filters.color) &&
                (!filters.year || animal.year === filters.year)
            );
        });
    }, [filters, cats]);

    return (
        <>
            <Navbar />
            <section className="cat-banner-image" style={{ backgroundImage: `url(${assets.Cat_image})` }}>
                <h1 className='cat-banner-title'>CATS AT CAS</h1>
                <p className='cat-banner-desc'>They come in all shapes and sizes, with different histories, characters and disabilities. But they have one thing in common: they are all in need of a helping hand</p>
                <div className="overlay"></div>
            </section>
            <div className="cat">
                {/* Filter Dropdowns */}
                <div className="cat-filter-options">
                    <h1 className='cat-filter-head'>FILTERS</h1>
                    <div className="cat-filter-dropdown">
                        <label>Breed:</label>
                        <select name="breed" onChange={handleFilterChange}>
                            <option value="">All</option>
                            {uniqueBreeds.map((breed, index) => (
                                <option key={index} value={breed}>{breed}</option>
                            ))}
                        </select>
                    </div>

                    <div className="cat-filter-dropdown">
                        <label>Age:</label>
                        <select name="age" onChange={handleFilterChange}>
                            <option value="">All</option>
                            {uniqueAges.map((age, index) => (
                                <option key={index} value={age}>{age}</option>
                            ))}
                        </select>
                    </div>

                    <div className="cat-filter-dropdown">
                        <label>Gender:</label>
                        <select name="gender" onChange={handleFilterChange}>
                            <option value="">All</option>
                            {uniqueGenders.map((gender, index) => (
                                <option key={index} value={gender}>{gender}</option>
                            ))}
                        </select>
                    </div>

                    <div className="cat-filter-dropdown">
                        <label>Color:</label>
                        <select name="color" onChange={handleFilterChange}>
                            <option value="">All</option>
                            {uniqueColors.map((color, index) => (
                                <option key={index} value={color}>{color}</option>
                            ))}
                        </select>
                    </div>

                    <div className="cat-filter-dropdown">
                        <label>Year:</label>
                        <select name="year" onChange={handleFilterChange}>
                            <option value="">All</option>
                            {uniqueYears.map((year, index) => (
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Displaying the filtered cats */}
                <div className="cat-right">
                    <h1>CATS:</h1>
                    <div className="cat-products">
                        {filteredAnimals.length > 0 ? (
                            filteredAnimals.map((animal, index) => (
                                <AnimalCards
                                    key={index}
                                    name={animal.name}
                                    id={animal._id} // Use the correct property for the ID
                                    year={animal.year}
                                    image={animal.image}
                                />
                            ))
                        ) : (
                            <p>No cats found for the selected filters.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cats; // Export the Cats component
