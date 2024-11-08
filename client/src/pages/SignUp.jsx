import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/SignUp.css'
import { assets } from '../assets/assets'
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import {setDoc,doc} from 'firebase/firestore'
import toast from 'react-hot-toast'
import { updateProfile } from 'firebase/auth';

const SignUp = () => {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [showPassword,setShowPassword] = useState(false)

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      
      if (user) {
        await updateProfile(user, {
          displayName: name
        });
  
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: name
        });
      }
      navigate('/login');
      toast.success("User Registered Successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (

    <div className='signup-main'>
      <div className='signup-container'>
        <div className='signup-image-container'>
          <img className='signup-image' src={assets.SignUp_Image} alt='signup_Image' />
        </div>
        <div className='signup-form'>
          <form onSubmit={registerUser}>
            <div className="signup-form-control">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
               className='signup-email'
                type="text"
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
              <div className='signup-email-icon'><MdEmail /></div>
            </div>

            <div className="signup-form-control">
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
              <div className='signup-password-icon' onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash/> : <FaEye />}
                </div>
            </div>

            <button className='signup-button' type="submit">Register</button>
          </form>
          <div className='signup-end-content-container'>
          <p className='signup-account-redirect'>Already Have an account? <Link to='/login'>Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
