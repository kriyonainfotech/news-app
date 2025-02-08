import React, { useState } from 'react'
import { FaBars, FaSearch } from 'react-icons/fa'
import { FiHome, FiSave, FiSearch, FiUser } from 'react-icons/fi';
import { SlBriefcase, SlWallet } from 'react-icons/sl';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from "../../../public/newsl-logo.png"
import { AiFillSave, AiOutlineSave } from 'react-icons/ai';

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get current URL path

  const navigate = useNavigate()
  const navManuBottom = [
    { title: 'Home', link: '/', icon: <FiHome />, action: () => navigate('/') },
    { title: 'Discover', link: '/search', icon: <FiSearch />, action: () => navigate('/search') },

    { title: 'Save', link: '/save', icon: <AiOutlineSave />, action: () => navigate('/work') },
    { title: 'Profile', link: '/profile', icon: <FiUser />, action: () => navigate('/profile') },
  ];


  return (
    <>
      <div className=''>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 fixed-top shadow px-2">
        <div className="container-fluid">
          {/* Logo */}
          <div className="logo">
            <Link to={"/"}>
            <h3 className="text-red">Gujrat News</h3>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="btn d-flex d-md-none" 
            type="button" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FaBars />
          </button>

          {/* Navbar Items (Collapse for Mobile) */}
          <div className={`collapse navbar-collapse px-3 ${isMobileMenuOpen ? 'show' : ''}`}>
 
            {/* Center Menu */}
            <ul className="navbar-nav me-auto d-flex gap-3">
              <li className="nav-item">
                <Link to="/headline" 
                  className={`nav-link ${location.pathname === '/headline' ? 'active-link' : ''}`}>
                  Headline
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/newsletter" 
                  className={`nav-link ${location.pathname === '/newsletter' ? 'active-link' : ''}`}>
                  Newsletter
                </Link>
              </li>
             
            </ul>
            <div className='d-none d-md-flex '>
            <Link to={"/search"} className='p-3 text-red'>
            <FaSearch size={20}/> 
            </Link>
            </div>
            {/* Right Section - Sign In Button */}
            <div className="d-flex">
              <Link to="/signin">
                <button className="btn bg-black px-3 py-2 text-white rounded-5" style={{ fontSize: "15px" }}>
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      </div>
      {/* nave bottom  */}
      <nav className={`d-lg-none navbar-expand-lg bg-light shadow-sm py-2 px-3 fixed-bottom`}>
        <div className="container">
          <div className="row justify-content-center overflow-hidden px-2">
            <ul className='d-flex justify-content-between'>
              {
                navManuBottom.map((val, i) => {
                  return (
                    <li key={i} className='text-center'>
                      <Link to={val.link} onClick={val.action} className={`${location.pathname === val.link ? 'text-red' : 'text-black'}`}>
                        <div className='fs-3 d-flex justify-content-center text-center'>
                          {val.icon}
                        </div>
                        <span style={{ fontSize: "14px" }}>{val.title} </span>
                      </Link>
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
