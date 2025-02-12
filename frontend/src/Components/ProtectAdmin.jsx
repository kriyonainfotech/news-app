
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contex/AuthContext';

const ProtectAdmin = ({ children }) => {
  const { user } = useContext(AuthContext)

  // Debugging: Check user data
  console.log("Current User:", user);

  // Check if the user is logged in and has the "admin" role
  if (!user || user.role !== "admin") {
    console.warn("Access Denied: User is not an admin");
    return <Navigate to="/" replace />; // Redirect if not an admin
  }

  return children; // Render the protected component if the user is an admin
};

export default ProtectAdmin;
