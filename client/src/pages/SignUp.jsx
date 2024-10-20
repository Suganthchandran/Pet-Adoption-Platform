import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import '../styles/SignUp.css'
import { assets } from '../assets/assets'
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

const SignUp = () => {

  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [showPassword,setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post('/api/auth/register', {
        name, email, password
      })
      if (data.error) {
        toast.error(data.error)
      }
      else {
        setData({});
        toast.success(`Login Successfully. Welcome !!!`);
        navigate('/login');
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (

    <div className='signup-main'>
      <div className='signup-container'> {/* New container */}
        <div className='signup-image-container'>
          <img className='signup-image' src={assets.SignUp_Image} alt='signup_Image' />
        </div>
        <div className='signup-form'>
          <form onSubmit={registerUser}>
            <div className="signup-form-control">
              <input
                type="text"
                required
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              <label>
                <span style={{ transitionDelay: '0ms' }}>U</span>
                <span style={{ transitionDelay: '100ms' }}>s</span>
                <span style={{ transitionDelay: '150ms' }}>e</span>
                <span style={{ transitionDelay: '200ms' }}>r</span>
                <span style={{ transitionDelay: '0ms' }}>n</span>
                <span style={{ transitionDelay: '100ms' }}>a</span>
                <span style={{ transitionDelay: '150ms' }}>m</span>
                <span style={{ transitionDelay: '200ms' }}>e</span>
              </label>
              <div className='signup-user-icon'><FaUserAlt /></div>
            </div>
            <div className="signup-form-control">
              <input
                type="email"
                required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <label>
                <span style={{ transitionDelay: '0ms' }}>E</span>
                <span style={{ transitionDelay: '50ms' }}>m</span>
                <span style={{ transitionDelay: '100ms' }}>a</span>
                <span style={{ transitionDelay: '150ms' }}>i</span>
                <span style={{ transitionDelay: '200ms' }}>l</span>
              </label>
              <div className='signup-email-icon'><MdEmail /></div>
            </div>

            <div className="signup-form-control">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <label>
                <span style={{ transitionDelay: '0ms' }}>P</span>
                <span style={{ transitionDelay: '50ms' }}>a</span>
                <span style={{ transitionDelay: '100ms' }}>s</span>
                <span style={{ transitionDelay: '150ms' }}>s</span>
                <span style={{ transitionDelay: '200ms' }}>w</span>
                <span style={{ transitionDelay: '250ms' }}>o</span>
                <span style={{ transitionDelay: '300ms' }}>r</span>
                <span style={{ transitionDelay: '350ms' }}>d</span>
              </label>
              <div className='signup-password-icon' onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash/> : <FaEye />}
                </div>
            </div>

            <button className='signup-button' type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
