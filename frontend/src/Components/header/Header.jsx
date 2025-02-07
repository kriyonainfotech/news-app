import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { FiHome, FiUser } from 'react-icons/fi';
import { SlBriefcase, SlWallet } from 'react-icons/sl';
import { Link } from 'react-router-dom'

const Header = () => {
  const [sticky, setSticky] = useState(false);

  return (
    <>
      <div className=''>
        {/* Fixed Navbar */}
        <nav className="navbar navbar-light bg-light py-3 fixed-top shadow">
        <div className="container-fluid">
          <button
            className="btn text-danger fs-4"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            <FaBars />
          </button>

          <a className="navbar-brand text-danger">News App</a>
        </div>
      </nav>
        <div className="offcanvas offcanvas-start" style={{ width: "300px" }} data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title text-danger" id="offcanvasScrollingLabel">News APP</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
          </div>
          <div className="offcanvas-body">
            <div className='d-flex align-items-center justify-content-between'>
              <h5 className="text-danger">India News</h5>
              <Link to={'/signUp'}>
                <button className='btn rounded-5 bg-black text-white px-3 py-1 '>Sign in</button>

              </Link>

            </div>
            <hr />
            <div>
              <h5 className="">News</h5>
              <ul className="list-group gap-2 p-2">
                <li className="btn btn-outline-danger border border-0 d-flex flex-start">Trending</li>
                <li className="btn btn-outline-danger border border-0 d-flex flex-start">Crime</li>
                <li className="btn btn-outline-danger border border-0 d-flex flex-start">Weather</li>
                <li className="btn btn-outline-danger border border-0 d-flex flex-start">Traffice</li>
                <li className="btn btn-outline-danger border border-0 d-flex flex-start">Sport</li>
                <li className="btn btn-outline-danger border border-0 d-flex flex-start">Bussiness</li>
                <li className="btn btn-outline-danger border border-0 d-flex flex-start">Education</li>

              </ul>
              <hr />
              <ul className="list-group gap-2 p-2">
                <li className="">Headlines</li>
                <li className="">NewsLetter</li>
                <li className="">Topics</li>

              </ul>

            </div>
          </div>
        </div>


      </div>
      
         
    </>
  )
}

export default Header
