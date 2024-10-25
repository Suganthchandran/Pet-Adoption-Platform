import React from 'react'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import Home from './pages/Home'
import { UserContextProvider } from '../context/UserContext'
import Dogs from './pages/Dogs'
import Cats from './pages/Cats'
import OtherAnimals from './pages/OtherAnimals'
import About from './pages/About'
import Contact from './pages/Contact'
import Shop from './pages/Shop'
import Footer from './components/Footer'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import AnimalDetail from './components/AnimalDetail'

axios.defaults.baseURL = 'http://localhost:8086'
axios.defaults.withCredentials = true

function App() {
  
  return (
    <>
      <UserContextProvider>
          <Toaster position='top-center' toastOptions={{duration:2000}} />
          <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<SignUp/>} />
              <Route path='/dogs' element={<Dogs/>} />
              <Route path='/cats' element={<Cats/>} />
              <Route path='/other-animals' element={<OtherAnimals/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/contact' element={<Contact/>} />
              <Route path='/shop' element={<Shop/>} />
              <Route path='/cart' element={<Cart/>} />
              <Route path='/place-order' element={<PlaceOrder/>} />
              <Route path='/orders' element={<Orders/>} />
              <Route path='/animal/:id' element={<AnimalDetail/>} />
          </Routes>
      </UserContextProvider>
      <Footer/>
    </>
  )
}

export default App
