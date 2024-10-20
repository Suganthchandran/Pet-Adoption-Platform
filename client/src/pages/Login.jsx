import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { assets } from '../assets/assets';
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [showPassword,setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post('/api/auth/login', {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='login-main'>
      <div className='login-container'> {/* New container */}
        <div className='login-image-container'>
          <img className='login-image' src={assets.login_image} alt='Login_Image' />
        </div>
        <div className='login-form'>
          <form onSubmit={loginUser}>
            <div className="login-form-control">
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
              <div className='login-email-icon'><MdEmail /></div>
            </div>
  
            <div className="login-form-control">
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
              <div className='login-password-icon' onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash/> : <FaEye />}
                </div>
            </div>
  
            <button className='login-button' type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default Login;
