import React, { useState } from 'react'
import Header from '../AdminComponents/header/Header'

const Dashboard = () => {
  const [userCount, setUserCount] = useState(10); // Default count

  return (
    <div>
      <Header/>
      <div>
      <div className="container d-flex justify-content-start" style={{marginTop : "100px"}}>
      <div className="card text-center shadow p-4" style={{ width: "300px" }}>
        <h5 className="card-title">Total Users</h5>
        <h1 className="display-4">{userCount}</h1>
      </div>
    </div>
      </div>
    </div>
  )
}

export default Dashboard
