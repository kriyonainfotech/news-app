import React from 'react'
import Header from '../AdminComponents/header/Header'
import { Link } from 'react-router-dom';

const Banner = () => {
  const users = [
    { id: 1, name: "Banner Name", image: "banner Image"},
   
  ];
  return (
    <>
    <div>
        <Header/>
        <div className="container" style={{marginTop : "100px"}}>
      <div className="card shadow-lg">
      <div className="card-header d-flex justify-content-between align-items-center bg-light ">
            <h2>Banners</h2>
            <Link to={"/admin/addBanner"} className='btn  bg-info text-white'>Add Banner</Link>
          </div>
        <div className="card-body">
          <table className="table table-hover table-bordered">
            <thead className="table">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Banner Image</th>
                <th>Action</th>
              
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.image}</td>
                    <td>
                      <button className="btn btn-primary m-1">Edit</button>
                      <button className="btn btn-danger m-1">Delete</button>
                    </td>
                  
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No users available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Banner