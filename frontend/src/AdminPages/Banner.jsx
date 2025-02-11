import React, { useEffect, useState } from 'react'
import Header from '../AdminComponents/header/Header'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const backend_API = import.meta.env.VITE_API_URL;
const Banner = () => {
   const [banners, setBanners] = useState([]);
    const [loading, setLoding] = useState(false);
  
  const navigate = useNavigate()

  const users = [
    { id: 1, name: "Banner Name", image: "banner Image" },

  ];

  const GetBanners = async() => {
    setLoding(true);
    try {
      const response = await axios.get(`${backend_API}/banner/getAllBanners`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response.status === 200) {
        console.log(response.data,"banner")
        setBanners(response.data.banners)
      }
    } catch (error) {
      console.error(error)
      console.log(error.response.data.message);
      alert(error.response.data.message)
    } finally {
      setLoding(false)
    }
  }
  useEffect(() => {
    GetBanners()
  },[])

  const deleteBanner = async (uid) => {
    alert(uid)
    try {
      const response = await axios.delete(`${backend_API}/banner/deleteBanner`,
        { data: { bannerId: uid } },
        {

          headers: {
            'Content-Type': 'application/json',
          }

        })
      if (response.status === 200) {
        console.log(response.data)
        alert(response.data.message)
        GetBanners()
      }
    } catch (error) {
      console.error(error)
      console.log(error.response.data.message);
      alert(error.response.data.message)
    } finally {
      setLoding(false)
    }
  }

  return (
    <>
      <div>
        <Header />
        <div className="container" style={{ marginTop: "100px" }}>
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
                  {banners.length > 0 ? (
                    banners.map((banner, index) => (
                      <tr key={banner.id}>
                        <td>{index + 1}</td>
                        <td>{banner.title}</td>
                        <td>
                          <img src={banner.imageUrl} alt="banner" style={{ width: "100px",
                          height: "100px"}}/>
                        </td>
                        <td>
                          <button className="btn btn-primary m-1" onClick={() => navigate(`/admin/editBanner`,{state : banner})}>Edit</button>
                          <button className="btn btn-danger m-1" onClick={() => deleteBanner(banner._id)}>Delete</button>
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