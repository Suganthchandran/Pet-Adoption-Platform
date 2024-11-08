import React, { useState } from 'react'
import '../styles/AddProduct.css'
import {assets} from '../assets/assets'
import axios from 'axios'
import {toast} from 'react-toastify'

const AddProduct = ({token}) => {

    const [image,setImage] = useState(false);
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [star,setStar] = useState("");
    const [sizes,setSizes] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData()

            formData.append("name",name)
            formData.append("price",price)
            formData.append("star",star)
            formData.append("category",category)
            formData.append("sizes",JSON.stringify(sizes))

            formData.append("image",image)

            const response = await axios.post("http://localhost:8086/api/product/",formData,{headers:{token}})

            if(response.data.success) {
                toast.success(response.data.message);
                setName("")
                setPrice("")
                setCategory("")
                setStar("")
                setImage(false)
            }
            else {
                toast.error(response.data.message)
            }
        }
        catch(error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    <>
        <h1>Add Products</h1>
    <form onSubmit={handleSubmit} className='add-form'>
        <div>
            <p className='add-image-head'>Upload Image</p>

            <div className='add-image-list'>
                <label htmlFor='image'>
                    <img className='add-image' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt=''/>
                    <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='image' hidden />
                </label>
            </div>
        </div>

        <div className='add-input-container'>
            <p>Product Name</p>
            <input onChange={(e)=> setName(e.target.value)} value={name} className='add-name-input' type='text' placeholder='Type here' required />
        </div>
        
        <div className='add-input-container'>
            <p>Product Category</p>
            <input onChange={(e)=> setCategory(e.target.value)} value={category} className='add-name-input' type='text' placeholder='Type here' required />
        </div>

        <div className='add-input-container'>
            <p>Rating</p>
            <input onChange={(e)=> setStar(e.target.value)} value={star} className='add-name-input' type='Number' placeholder='Type here' required />
        </div>


        <div className='add-content2'>

        <div>
                <p>Product Price</p>
                <input onChange={(e)=> setPrice(e.target.value)} className='add-price-input' type='Number' placeholder='69' required />
            </div>

<div>
            <p>Product Sizes</p>
            <div className='add-size'>
                <div onClick={()=> setSizes(prev => prev.includes("1kg") ? prev.filter(item => item !== "1kg") : [...prev,"1kg"])}>
                    <p className={` ${sizes.includes("1kg") ? "add-size-click" : " "} add-size-p`}>1kg</p>
                </div>

                <div onClick={()=> setSizes(prev => prev.includes("2kg") ? prev.filter(item => item !== "2kg") : [...prev,"2kg"])}>
                    <p className={` ${sizes.includes("2kg") ? "add-size-click" : " "} add-size-p`}>2kg</p>
                </div>

                <div onClick={()=> setSizes(prev => prev.includes("5kg") ? prev.filter(item => item !== "5kg") : [...prev,"5kg"])}>
                    <p className={` ${sizes.includes("5kg") ? "add-size-click" : " "} add-size-p`}>5kg</p>
                </div>
            </div>
            </div>
        </div>

        <button type='submit' className='add-button'>ADD</button>
    </form>
    </>

  )
}

export default AddProduct
