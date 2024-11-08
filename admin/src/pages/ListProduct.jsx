import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/ListProduct.css';

const ListProduct = ({ token }) => {
    const [listProduct, setListProduct] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8086/api/product');
            setListProduct(response.data.reverse());
        } catch (error) {
            toast.error(error.message);
        }
    };

    const removeProduct = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8086/api/product/${id}`, {
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
            <h1>All Product List</h1>

            <div className='list-main'>
                <div className='list-table-head'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Price</b>
                    <b>Star Rating</b>
                    <b>Category</b>
                    <b>Sizes</b>
                    <b>Action</b>
                </div>

                <div className='list-table-content-container'>
                    {listProduct.map((item, index) => (
                        <div className='list-table-content' key={index}>
                            <img style={{ width: '4rem', objectFit: 'cover', marginLeft:'2.3rem' }} src={item.image} alt={item.name} />
                            <p>{item.name}</p>
                            <p>${item.price}</p>
                            <p>{item.star}</p>
                            <p>{item.category}</p>
                            <p>{item.sizes.join(', ')}</p>
                            <p onClick={() => removeProduct(item._id)} className='list-table-x'>X</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ListProduct;
