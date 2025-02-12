import React, { useEffect, useState } from 'react'
const API_KEYS = Object.keys(import.meta.env)
    .filter((key) => key.startsWith("VITE_API_KEY_"))
    .map((key) => import.meta.env[key]);
// console.log(API_KEYS,"keys");

const Keys = () => {
    const [key,setKey] = useState([])
    useEffect(() =>{
        setKey(API_KEYS)
    },[])
  return (
    <>
    <div>
    <div className="container mt-5">
      <h2 className="mb-4 text-center">API Key Usage Dashboard</h2>
      <table className="table table-striped table-bordered text-center">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>API Key</th>
            
          </tr>
        </thead>
        <tbody>
          {key.map((key, index) => (
            <tr key={index} >
              <td>{index + 1}</td>
              <td>{key}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        
    </div>
    </>
  )
}

export default Keys