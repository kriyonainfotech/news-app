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
          <div className="col-12 d-flex align-items-center">
          <button 
            className="btn d-flex" 
            type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" 
          >
            <FaBars />
          </button>
            {/* Logo */}
          <div className="logo">
            <Link to={"/"}>
            <h3 className="text-red">Gujrat News</h3>
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
      <div className="offcanvas offcanvas-start" style={{width :"250px"}} data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div className="offcanvas-header">
    <h3 className="offcanvas-title text-red" id="offcanvasScrollingLabel">Gujrat News</h3>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
        <div className="manu">
            <ul className="list-group list-group-flush p-1">
                <li className='py-1'>
                    <Link to={"/admin"} className="text-red fs-5">Dashboard</Link>
                </li>
                <li className='py-1'>
                    <Link to={"/admin/users"} className="text-red fs-5">Uses</Link>
                </li>
                <li className='py-1'>
                    <Link to={"/admin/banner"} className="text-red fs-5">Manage Banner</Link>
                </li>
            </ul>
        </div>
  </div>
</div>
    </>
  )
}

export default Header
