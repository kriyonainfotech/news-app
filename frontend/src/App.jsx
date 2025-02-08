import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Components/Register'
import Login from './Components/Login'
import NewsDetail from './Components/News/NewsDetail'
import Discover from './Pages/Discover'
import DiscoverResults from './Pages/DiscoverResults'
import Newsleter from './Pages/Newsleter'
import Headline from './Pages/Headline'

const App = () => {
  return (
   <>
  <Routes>
    
    <Route path="/signUp" element={<Register />} />
    <Route path="/signin" element={<Login />} />
    <Route path="/" element={<Home />} />
    <Route path="/news/:id" element={<NewsDetail />} />
    <Route path="/search" element={<Discover />} />
    <Route path="/news" element={<DiscoverResults />} />
    <Route path="/newsletter" element={<Newsleter />} />
    <Route path="/headline" element={<Headline />} />
  </Routes>
   </>
  )
}

export default App
