import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Components/Register'
import Login from './Components/Login'

const App = () => {
  return (
   <>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signUp" element={<Register />} />
    <Route path="/signin" element={<Login />} />
  </Routes>
   </>
  )
}

export default App
