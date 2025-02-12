import React, { useEffect, useState } from 'react'
import Header from '../AdminComponents/header/Header'
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Keys from './Keys';
const backend_API = import.meta.env.VITE_API_URL;
const Dashboard = () => {
  const [userCount, setUserCount] = useState(10); // Default count
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
      alert(error.response.data.message)
    } finally {
      setLoding(false)
    }
  }
  useEffect(() => {
    GetUsers()
  },[])
  return (
    <div>
      <Header/>
      <div>
      <div className="container d-flex justify-content-start" style={{marginTop : "100px"}}>
       
      <div className="card text-center shadow p-4" style={{ width: "300px" }}>
        <h5 className="card-title">Total Users</h5>
        <h1 className="display-4">{users.length}</h1>
      </div>
      
    </div>
      </div>
    </div>
  )
}

export default Dashboard
