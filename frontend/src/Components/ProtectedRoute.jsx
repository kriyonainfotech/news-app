import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contex/AuthContext';

const ProtectedRoute = () => {
     const { user } = useContext(AuthContext);

   // return token ? <Outlet /> : <Navigate to="login" />
    return user ? <Outlet /> : <Navigate to="signin" />
}

export default ProtectedRoute