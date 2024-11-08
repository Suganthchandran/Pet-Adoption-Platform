import React, { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Orders from './pages/Orders'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddAnimal from './pages/AddAnimal'
import AddProduct from './pages/AddProduct'
import ListAnimal from './pages/ListAnimal'
import ListProduct from './pages/ListProduct'
import Users from './pages/Users'
import Adopt from './pages/Adopt'

export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "");

  useEffect(()=>{
    localStorage.setItem('token',token);
  },[token])

  return (
    <div className='app'>
      <ToastContainer/>
      {token === "" ? <Login setToken={setToken} /> :
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='app-main'>
            <Sidebar />
            <div className='app-content'>
              <Routes>
                <Route path='/' element={<Navigate to='/addAnimal' />} />
                <Route path='/addAnimal' element={<AddAnimal token={token}/>} />
                <Route path='/addProduct' element={<AddProduct token={token}/>} />
                <Route path='/listAnimal' element={<ListAnimal token={token}/>} />
                <Route path='/listProduct' element={<ListProduct token={token}/>} />
                <Route path='/orders' element={<Orders token={token} />} />
                <Route path='/users' element={<Users token={token}/>} />
                <Route path='/adopt' element={<Adopt/>} />
              </Routes>
            </div>
          </div>
        </>
      }

    </div>
  )
}

export default App
