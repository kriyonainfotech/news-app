import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contex/AuthContext';

const ProtectAdmin = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Check if the user is logged in and has the "Admin" role
  if (!user || user.role !== 'admin') {
    return <Navigate to="/"/>; // Redirect if not an admin
  }

  return children; // Render the protected component if the user is an admin
};

export default ProtectAdmin;
