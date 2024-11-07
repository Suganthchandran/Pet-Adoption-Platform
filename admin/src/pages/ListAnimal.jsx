import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/ListAnimal.css';

const ListAnimal = ({ token }) => {
    const [listAnimal, setListAnimal] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8086/api/animal');
                setListAnimal(response.data.reverse());
        } catch (error) {
            toast.error(error.message);
        }
    };

    const removeProduct = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8086/api/animal/${id}`, {
                headers: { token }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchData();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h1>All Animal List</h1>

            <div className='list-main'>
                <div className='list-table-head2'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Type</b>
                    <b>Breed</b>
                    <b>Age</b>
                    <b>Gender</b>
                    <b>Year</b>
                     <b>Color</b>
                    <b>Stack</b>
                     <b>Owner Name</b>
                    <b>Owner Phone</b>
                    {/*<b>Owner Email</b> */}
                    <b>Action</b>
                </div>

                <div className='list-table-content-container'>
                    {listAnimal.map((item, index) => (
                        <div className='list-table-content2' key={index}>
                            <img style={{ width: '4rem', objectFit: 'cover' }} src={item.image} alt='' />
                            <p>{item.name}</p>
                            <p>{item.type}</p>
                            <p>{item.breed}</p>
                            <p>{item.age}</p>
                            <p>{item.gender}</p>
                            <p>{item.year}</p>
                             <p>{item.color}</p>
                            <p>{item.stack}</p>
                             <p>{item.ownerName}</p>
                            <p>{item.ownerphone}</p>
                            {/*<p>{item.owneremail}</p> */}
                            <p onClick={() => removeProduct(item._id)} className='list-table-x'>X</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ListAnimal;
