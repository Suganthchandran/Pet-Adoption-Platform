import React, { useState } from 'react'
import '../styles/AddAnimal.css'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddAnimal = ({ token }) => {
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
  
          const response = await axios.post("http://localhost:8086/api/animal", formData, { headers: { token } });
  
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
                {/* Other input fields remain unchanged */}
                <div>
                    <p className='add-form-select-head'>Certificates</p>
                    <input onChange={handleCertificatesChange} className='add-name-input' type='file' multiple />
                </div>
            </div>

            <button type='submit' className='add-button'>ADD</button>
        </form>
    )
}

export default AddAnimal;
