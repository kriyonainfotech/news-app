import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Components/Register'
import Login from './Components/Login'
import NewsDetail from './Components/News/NewsDetail'
import { ToastContainer } from 'react-toastify';
import Discover from './Pages/Discover'
import DiscoverResults from './Pages/DiscoverResults'
import Newsleter from './Pages/Newsleter'
import Headline from './Pages/Headline'
import Dashboard from './AdminPages/Dashboard'
import Users from './AdminPages/Users'
import Banner from './AdminPages/Banner'
import CreateUser from './AdminComponents/Users/CreateUser'
import EditUser from './AdminComponents/Users/EditUser'
import AddBanner from './AdminComponents/Banner/AddBanner'
import { AuthProvider } from './contex/AuthContext'
import EditBanner from './AdminComponents/Banner/EditBanner'
import Profile from './Pages/Profile'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import ProtectedRoute from './Components/ProtectedRoute'
import ProtectAdmin from './Components/ProtectAdmin'

const App = () => {
  return (
   <>
   <AuthProvider>
   <ToastContainer />
  <Routes>
  
          <Route path="/signUp" element={<Register />} />
    <Route path="/signin" element={<Login />} />
    <Route path="/" element={<Home />} />
    <Route path="/news/:id" element={<NewsDetail />} />
    <Route path="/search" element={<Discover />} />
    <Route path="/news" element={<DiscoverResults />} />
    <Route path="/newsletter" element={<Newsleter />} />
    <Route path="/headline" element={<Headline />} />
     <Route element={<ProtectedRoute />}>
     <Route path="/profile" element={<Profile />} />
     </Route>
   
    <Route path="/privecyPolicy" element={<PrivacyPolicy />} />
  <Route path="/admin" element={<ProtectAdmin><Dashboard /></ProtectAdmin>} />
    {/* <Route path="/admin" element={<Dashboard />} /> */}
    <Route path="/admin/users" element={<Users />} />
    <Route path="/admin/createUser" element={<CreateUser />} />
    <Route path="/admin/editUser" element={<EditUser />} />
    <Route path="/admin/banner" element={<Banner />} />
    <Route path="/admin/addBanner" element={<AddBanner />} />
    <Route path="/admin/editBanner" element={<EditBanner />} />

  
  </Routes>
  </AuthProvider>
   </>
  )
}

export default App
