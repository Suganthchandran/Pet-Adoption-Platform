import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { assets } from '../assets/assets';
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import toast from 'react-hot-toast';

const Login = () => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [showPassword,setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth,email,password);
      console.log("User Logged In Successfully");
      window.location.href = "/";
      toast.success("User Logged In Successfully");
    }
    catch(error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handlePasswordReset = async () => {
    const email = prompt('Please Enter your email');
    sendPasswordResetEmail(auth, email);
    alert('Email sent! Check your inbox for password reset instructions...')
  }

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <p onClick={handlePasswordReset}>Forgot Password ?</p>
          <p>Don't Have an account? </p>
          <Link to='/register'>Sign Up</Link>
        </div>
      </div>
    </div>
  );

};

export default Login;