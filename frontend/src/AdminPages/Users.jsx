import React, { useEffect, useState } from 'react'
import Header from '../AdminComponents/header/Header';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../Components/Loading';
const backend_API = import.meta.env.VITE_API_URL;
const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoding] = useState(false);

  const navigate = useNavigate()

  const GetUsers = async () => {
    setLoding(true);
    try {
      const response = await axios.get(`${backend_API}/auth/getalluser`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response.status === 200) {
        console.log(response.data)
        setUsers(response.data.user)

        // localStorage.setItem("token",JSON.stringify(response.data.token))
        // navigate('/')
      }
    } catch (error) {
      console.error(error)
      console.log(error.response.data.message);
      toast(error.response.data.message)
    } finally {
      setLoding(false)
    }
  }
  const deleteUser = async (uid) => {
    // alert(id)
    try {
      const response = await axios.delete(`${backend_API}/auth/deleteUser`,
        { data: { id: uid } },
        {

          headers: {
            'Content-Type': 'application/json',
          }

        })
      if (response.status === 200) {
        console.log(response.data)
        toast(response.data.message)
        GetUsers()
      }
    } catch (error) {
      console.error(error)
      console.log(error.response.data.message);
      toast(error.response.data.message)
    } finally {
      setLoding(false)
    }
  }

  useEffect(() => {
    GetUsers();
  }, [])

  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="card shadow-lg">
          <div className="card-header d-flex justify-content-between align-items-center bg-light ">
            <h2>User List</h2>
            <Link to={"/admin/createUser"} className='btn  bg-info text-white'>Create User</Link>
          </div>
          <div className="card-body">
            <div className="table-responsive"> 
              <table className="table table-hover table-bordered text-center">
                <thead className="table">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>phone</th>
                    <th>Action</th> {/* Added action column */}
                  </tr>
                </thead>
                <tbody>
                {loading && <Loading />}

                  {!loading && users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={++index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          <button className="btn btn-danger btn-sm m-1" onClick={() => deleteUser(user._id)}>Delete</button>
                          <button className="btn btn-success btn-sm m-1" onClick={() => navigate(`/admin/editUser`, { state: user })}>Edit</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
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
    </div>
  )
}

export default Users
