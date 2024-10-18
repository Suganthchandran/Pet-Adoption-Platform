import React from 'react'
import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import Home from './pages/Home'
import { UserContextProvider } from '../context/UserContext'
import Footer from './components/Footer'

axios.defaults.baseURL = 'http://localhost:8086'
axios.defaults.withCredentials = true

function App() {

  return (
    <>
      <BrowserRouter>
      <UserContextProvider>
          <Toaster position='top-right' toastOptions={{duration:2000}} />
          <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<SignUp/>} />
          </Routes>
          <Footer/>
      </UserContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
